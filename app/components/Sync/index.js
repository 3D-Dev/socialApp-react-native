import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import { healthCheck } from 'redux/auth/actions';
import { setAppSettings } from 'redux/app/actions';
import {
  listReflections,
  addReflections,
  updateReflections,
  removeReflections
} from 'redux/reflection/actions';
import { setProfileData, readProfile, updateProfile } from 'redux/user/actions';
import { setReflection } from 'redux/data/actions';
import { getSelector } from 'redux/selectors';
import immutableToJS from 'utils/immutableToJS';

const offlineLimit = 3;

class Sync extends Component {
  static propTypes = {
    appSettings: PropTypes.shape().isRequired,
    healthCheck: PropTypes.func.isRequired,
    setAppSettings: PropTypes.func.isRequired,
    reflection: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setReflection: PropTypes.func.isRequired,

    // Profile
    readProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    setProfileData: PropTypes.func.isRequired,
    profileData: PropTypes.shape({
      updated: PropTypes.string
    }).isRequired,

    // reflections
    listReflections: PropTypes.func.isRequired,
    addReflections: PropTypes.func.isRequired,
    updateReflections: PropTypes.func.isRequired,
    removeReflections: PropTypes.func.isRequired
  };

  componentDidMount() {
    setTimeout(() => {
      this.setOnline(false);
      this.setSyncing(false);
    }, 1000);
    this.offline = 0;
    setTimeout(this.checkHealth, 2000);
    this.syncRequired = {
      profile: false
    };
  }

  checkHealth = () => {
    const { healthCheck } = this.props;
    this.healthOnline = false;
    healthCheck({
      onSuccess: () => {
        this.onlineConfirmed();
        this.offline = 0;
        this.healthOnline = true;
      }
    });
    setTimeout(() => {
      if (!this.healthOnline) {
        this.offline++;
        if (this.offline > offlineLimit) {
          this.offlineConfirmed();
          // Only consider it's offline if it detects offline 3 times in a row.
        }
      }
    }, 5000); // If it doesn't respond for 5 seconds, we assume it's offline now.
    setTimeout(this.checkHealth, 10000); // Check every 10 seconds
  };

  onlineConfirmed = () => {
    const { appSettings } = this.props;
    if (!appSettings.online) {
      this.setSyncing(true);
      console.log('Synchronization started');
      this.syncRequired = {
        profile: true,
        reflections: true
      };
      this.syncProfile(() => {
        this.syncRequired.profile = false;
        this.checkSyncDone();
      });
      this.syncReflections(() => {
        this.syncRequired.reflections = false;
        this.checkSyncDone();
      });
    }
    this.setOnline(true);
  };

  offlineConfirmed = () => {
    this.setOnline(false);
  };

  setOnline = online => {
    const { setAppSettings, appSettings } = this.props;
    if (appSettings.online !== online) {
      setAppSettings({ ...appSettings, online });
    }
  };

  setSyncing = syncing => {
    const { setAppSettings, appSettings } = this.props;
    if (appSettings.syncing !== syncing) {
      setAppSettings({ ...appSettings, syncing });
    }
  };

  checkSyncDone = () => {
    if (
      Object.keys(this.syncRequired).findIndex(
        key => this.syncRequired[key]
      ) === -1
    ) {
      this.setSyncing(false);
      console.log('Synchronization finished');
    }
  };

  // Profile Synchronization
  syncProfile = cb => {
    const {
      readProfile,
      updateProfile,
      setProfileData,
      profileData
    } = this.props;

    readProfile({
      onSuccess: payload => {
        if (
          !profileData.updated ||
          new Date(payload.updated) > new Date(profileData.updated)
        ) {
          // If backend profile data is newer
          setProfileData(payload);
          cb();
        } else {
          // If frontend profile data is newer
          updateProfile({
            ...pick(profileData, ['name', 'avatar', 'user_id']),
            onSuccess: cb,
            onFailure: cb
          });
        }
      },
      onFailure: cb
    });
  };

  // Reflection Synchronization
  syncReflections = cb => {
    const {
      setReflection,
      addReflections,
      removeReflections,
      updateReflections,
      listReflections,
      reflection
    } = this.props;
    const addList = {};
    const removeList = [];
    const updateList = [];
    console.log('reflection sync start');
    listReflections({
      onSuccess: ({ reflections }) => {
        console.log('reflection list');
        reflection.forEach(item => {
          if (item.removed) {
            if (item._id) {
              removeList.push(item._id);
            }
            return;
          }
          if (!item._id) {
            const type = item.type.toLowerCase();
            addList[type] = addList[type] || [];
            addList[type].push(item.data);
            return;
          }
          const oldReflection = reflections.find(({ _id }) => item._id === _id);
          if (
            oldReflection &&
            new Date(item.updated) > new Date(oldReflection.updated)
          ) {
            updateList.push({ _id: item._id, data: item.data });
          }
        });
        let updatedReflections = reflection;
        if (
          !Object.keys(addList).length &&
          !removeList.length &&
          !updateList.length
        ) {
          updatedReflections = reflections;
        }
        const syncDone = () => {
          setReflection(updatedReflections);
          cb();
        };
        const update = () => {
          if (updateList.length) {
            updateReflections({
              data: updateList,
              onSuccess: ({ reflections }) => {
                updatedReflections = reflections;
                syncDone();
              },
              onFailure: syncDone
            });
          } else {
            syncDone();
          }
        };
        const remove = () => {
          if (removeList.length) {
            removeReflections({
              data: removeList,
              onSuccess: ({ reflections }) => {
                updatedReflections = reflections;
                update();
              },
              onFailure: syncDone
            });
          } else {
            update();
          }
        };
        const add = () => {
          if (Object.keys(addList).length) {
            addReflections({
              data: addList,
              onSuccess: ({ reflections }) => {
                updatedReflections = reflections;
                remove();
              },
              onFailure: syncDone
            });
          } else {
            remove();
          }
        };
        add();
      },
      onFailure: cb
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  reflection: getSelector('data', 'reflection')(state),
  appSettings: getSelector('app', 'appSettings')(state),
  profileData: getSelector('user', 'profileData')(state)
});

const mapDispatchToProps = dispatch => ({
  healthCheck: payload => dispatch(healthCheck(payload)),
  setAppSettings: payload => dispatch(setAppSettings(payload)),
  readProfile: payload => dispatch(readProfile(payload)),
  updateProfile: payload => dispatch(updateProfile(payload)),
  setProfileData: payload => dispatch(setProfileData(payload)),

  // reflections
  setReflection: payload => dispatch(setReflection(payload)),
  listReflections: (...args) => dispatch(listReflections(...args)),
  addReflections: (...args) => dispatch(addReflections(...args)),
  updateReflections: (...args) => dispatch(updateReflections(...args)),
  removeReflections: (...args) => dispatch(removeReflections(...args))
});

export default compose(
  setDisplayName('Sync'),
  connect(mapStateToProps, mapDispatchToProps),
  immutableToJS
)(Sync);
