import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { compact } from 'lodash';

import themes from 'constants/themes';
import { injectIntl } from 'components/Internationalization/Intl';
import { getSelector, getRequestingSelector } from 'redux/selectors';
import { setReflection } from 'redux/data/actions';
import { setAppSettings } from 'redux/app/actions';
import {
  listReflections,
  addReflections,
  updateReflections,
  removeReflections
} from 'redux/reflection/actions';
import { setProfileData, readUsers, setUsers } from 'redux/user/actions';
import { setConstantData } from 'redux/constant/actions';

import immutableToJS from 'utils/immutableToJS';

const withCommonContext = ComponentWrapped => {
  class CustomThemeProvider extends Component {
    static propTypes = {
      formatMessage: PropTypes.func.isRequired,
      reflection: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      setReflection: PropTypes.func.isRequired,
      appSettings: PropTypes.shape({
        theme: PropTypes.string
      }).isRequired,
      setAppSettings: PropTypes.func.isRequired,
      constantData: PropTypes.shape({}).isRequired,
      setConstantData: PropTypes.func.isRequired,

      // for users
      readUsers: PropTypes.func.isRequired,
      setUsers: PropTypes.func.isRequired,
      users: PropTypes.shape({}).isRequired,
      profileData: PropTypes.shape({}).isRequired,
      setProfileData: PropTypes.func.isRequired,

      // reflections
      listReflections: PropTypes.func.isRequired,
      addReflections: PropTypes.func.isRequired,
      updateReflections: PropTypes.func.isRequired,
      removeReflections: PropTypes.func.isRequired,
      reflectionRequesting: PropTypes.bool.isRequired
    };

    static childContextTypes = {
      formatMessage: PropTypes.func,
      currentTheme: PropTypes.shape({}),
      reflection: PropTypes.arrayOf(PropTypes.shape()),
      setReflection: PropTypes.func,
      appSettings: PropTypes.shape({}),
      setAppSettings: PropTypes.func,
      constantData: PropTypes.shape({}),
      setConstantData: PropTypes.func,

      // for users
      readUsers: PropTypes.func.isRequired,
      setUsers: PropTypes.func.isRequired,
      users: PropTypes.shape({}).isRequired,
      profileData: PropTypes.shape({}).isRequired,
      setProfileData: PropTypes.func,

      // reflections
      listReflections: PropTypes.func.isRequired,
      addReflections: PropTypes.func.isRequired,
      updateReflections: PropTypes.func.isRequired,
      removeReflections: PropTypes.func.isRequired,
      resetReflections: PropTypes.func.isRequired,
      addReflection: PropTypes.func.isRequired,
      updateReflectionByIndex: PropTypes.func.isRequired,
      removeReflectionByIndex: PropTypes.func.isRequired,
      reflectionRequesting: PropTypes.bool.isRequired
    };

    getChildContext() {
      const {
        formatMessage,
        setReflection,
        reflection,
        setAppSettings,
        appSettings,

        constantData,
        setConstantData,

        // for users
        readUsers,
        setUsers,
        users,
        profileData,
        setProfileData,

        // reflections
        listReflections,
        addReflections,
        updateReflections,
        removeReflections,
        reflectionRequesting
      } = this.props;

      const themeKey = appSettings.theme || 'default';

      return {
        formatMessage,
        currentTheme: themes[themeKey],
        setReflection,
        reflection,
        setAppSettings,
        appSettings,
        constantData,
        setConstantData,

        // for users
        readUsers,
        setUsers,
        users,
        profileData,
        setProfileData,

        // reflections
        reflectionRequesting,
        listReflections,
        addReflections,
        updateReflections,
        removeReflections,
        resetReflections: (reflections, reflectionType) => {
          setReflection([
            ...reflection.filter(({ type }) => type !== reflectionType),
            ...reflections.filter(({ type }) => type === reflectionType)
          ]);
        },
        addReflection: (newReflection, type) => {
          setReflection([
            ...reflection,
            {
              type,
              data: newReflection,
              created: new Date(
                newReflection.createdAt || Date.now()
              ).toISOString(),
              updated: new Date(
                newReflection.createdAt || Date.now()
              ).toISOString()
            }
          ]);
        },
        updateReflectionByIndex: (index, data, reflectionType) => {
          const reflections = reflection
            .filter(({ type }) => type === reflectionType)
            .map((item, reflectionIndex) => {
              if (index !== reflectionIndex) return item;
              return {
                ...item,
                updated: new Date(Date.now()).toISOString(),
                data: {
                  ...item.data,
                  ...data
                }
              };
            });
          setReflection([
            ...reflection.filter(({ type }) => type !== reflectionType),
            ...reflections
          ]);
        },
        removeReflectionByIndex: (index, reflectionType) => {
          const reflections = compact(
            reflection
              .filter(({ type }) => type === reflectionType)
              .map((item, reflectionIndex) => {
                if (index !== reflectionIndex) return item;
                if (!item._id) return null;
                return {
                  ...item,
                  removed: new Date(Date.now()).toISOString()
                };
              })
          );
          setReflection([
            ...reflection.filter(({ type }) => type !== reflectionType),
            ...reflections
          ]);
        }
      };
    }

    render() {
      const {
        reflection,
        setReflection,
        formatMessage,
        setAppSettings,
        appSettings,

        // for users
        readUsers,
        setUsers,
        users,
        setProfileData,
        profileData,

        // reflections
        listReflections,
        addReflections,
        updateReflections,
        removeReflections,
        ...rest
      } = this.props;

      const themeKey = appSettings.theme || 'default';

      return (
        <ThemeProvider theme={themes[themeKey]}>
          <ComponentWrapped {...rest} />
        </ThemeProvider>
      );
    }
  }

  const mapStateToProps = state => ({
    reflection: getSelector('data', 'reflection')(state),
    appSettings: getSelector('app', 'appSettings')(state),
    constantData: getSelector('constant', 'constantData')(state),

    // for users
    profileData: getSelector('user', 'profileData')(state),
    users: getSelector('user', 'users')(state),

    // reflections
    reflectionRequesting: getRequestingSelector(
      'reflection',
      'reflection'
    )(state)
  });

  const mapDispatchToProps = dispatch => ({
    setReflection: payload => dispatch(setReflection(payload)),
    setAppSettings: payload => dispatch(setAppSettings(payload)),
    setConstantData: payload => dispatch(setConstantData(payload)),

    // for users
    readUsers: payload => dispatch(readUsers(payload)),
    setUsers: payload => dispatch(setUsers(payload)),
    setProfileData: payload => dispatch(setProfileData(payload)),

    // reflections
    listReflections: (...args) => dispatch(listReflections(...args)),
    addReflections: (...args) => dispatch(addReflections(...args)),
    updateReflections: (...args) => dispatch(updateReflections(...args)),
    removeReflections: (...args) => dispatch(removeReflections(...args))
  });

  return compose(
    setDisplayName('CustomThemeProvider'),
    connect(mapStateToProps, mapDispatchToProps),
    injectIntl,
    immutableToJS
  )(CustomThemeProvider);
};

export default withCommonContext;
