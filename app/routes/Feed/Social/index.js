import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { readContacts, setContacts } from 'redux/contact/actions';
import { readNetworks, setNetworks } from 'redux/network/actions';
import { SideMenuView } from 'components';
import { getLatestUpdateFromArray } from 'utils/api';

import { SubMenuContent } from './_components';
import FeedSection from './FeedSection';

class Feed extends Component {
  static propTypes = {
    // for networks
    readNetworks: PropTypes.func.isRequired,
    setNetworks: PropTypes.func.isRequired,
    networks: PropTypes.shape({
      networks: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,

    // for contacts
    readContacts: PropTypes.func.isRequired,
    setContacts: PropTypes.func.isRequired,
    contacts: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    readUsers: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    users: PropTypes.shape({}).isRequired,
    profileData: PropTypes.shape({}).isRequired
  };

  constructor(props, context) {
    super(props);
    this.state = {
      users: (context.users || {}).users || [],
      contacts: (props.contacts || {}).contacts || [],
      networks: (props.networks || {}).networks || []
    };
  }

  componentWillMount() {
    // load user data from backend
    this.loadAndStoreUserData();

    // load network data from backend
    this.loadAndStoreNetworks();

    // load contacts data from backend
    this.loadAndStoreContacts();
  }

  loadAndStoreUserData = () => {
    const { readUsers, setUsers, users } = this.context;
    readUsers({
      onSuccess: payload => {
        if (payload && payload.users) {
          if (
            !users.updated ||
            getLatestUpdateFromArray(payload.users) > new Date(users.updated)
          ) {
            setUsers({
              updated: getLatestUpdateFromArray(payload.users).toString(),
              users: payload.users
            });
            this.setState({ users: payload.users });
          }
        }
      }
    });
  };

  loadAndStoreNetworks = () => {
    const { readNetworks, networks } = this.props;

    readNetworks({
      onSuccess: payload => {
        if (
          !networks.updated ||
          new Date(networks.updated) <
            getLatestUpdateFromArray(payload.networks)
        ) {
          this.forceUpdateLocalNetworks(payload.networks);
        }
      },
      onFailure: e => {
        console.log('readNetworks failed', e);
      }
    });
  };

  forceUpdateLocalNetworks = networks => {
    const { users } = this.context;
    const { setNetworks } = this.props;

    const newNetworks = [];
    if (users && users.users && users.users.length > 0) {
      networks.forEach(network => {
        const { members } = network;
        const membersWithFullData = members.map(memberId => {
          const thisUser = ((users || {}).users || []).find(
            user => user._id === memberId
          );
          return thisUser;
        });
        const newNetwork = {
          ...network,
          members: membersWithFullData
        };
        newNetworks.push(newNetwork);
      });
    }

    setNetworks({
      updated: getLatestUpdateFromArray(networks).toString(),
      networks: newNetworks
    });
    this.setState({ networks: newNetworks });
  };

  loadAndStoreContacts = () => {
    const { readContacts, contacts, setContacts } = this.props;
    readContacts({
      onSuccess: payload => {
        if (
          payload.contacts.length === 0 ||
          !contacts.updated ||
          new Date(payload.updated) > new Date(contacts.updated)
        ) {
          setContacts(payload);
          this.setState({ contacts: payload.contacts });
        }
      },
      onFailure: e => {
        console.log('read contacts failed', e);
      }
    });
  };

  render() {
    const { formatMessage, profileData } = this.context;
    const { users, networks, contacts } = this.state;

    const acceptedContacts =
      contacts.length > 0 ? contacts.filter(item => item.status === 1) : [];

    return (
      <SideMenuView
        sideMenu={<SubMenuContent />}
        side="right"
        type="overlay"
        headerTitle={formatMessage('feed.headerTitle')}
        hasBack={false}
      >
        {users && users.length > 0 ? (
          <FeedSection
            networks={networks}
            contacts={acceptedContacts}
            users={users.filter(item => item.id !== profileData._id)}
          />
        ) : (
          <></>
        )}
      </SideMenuView>
    );
  }
}

const mapStateToProps = state => ({
  networks: getSelector('network', 'networks')(state),
  contacts: getSelector('contact', 'contacts')(state)
});

const mapDispatchToProps = dispatch => ({
  readNetworks: payload => dispatch(readNetworks(payload)),
  setNetworks: payload => dispatch(setNetworks(payload)),
  readContacts: payload => dispatch(readContacts(payload)),
  setContacts: payload => dispatch(setContacts(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
