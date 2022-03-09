import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { setContacts } from 'redux/contact/actions';
import { readNetworks, setNetworks } from 'redux/network/actions';
import { App } from 'components';
import { HeaderTitle, HeaderRight, Section, H4 } from 'elements';
import { getLatestUpdateFromArray } from 'utils/api';

import PendingRequests from './PendingRequests';
import { TrustNetworkBox, AddNew } from '../_components';

class NetworkMain extends Component {
  static propTypes = {
    // for networks
    readNetworks: PropTypes.func.isRequired,
    setNetworks: PropTypes.func.isRequired,
    networks: PropTypes.shape({
      networks: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    setContacts: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    // for users
    readUsers: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    users: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      networks: props.networks.networks || []
    };
  }

  componentWillMount() {
    // read updated users
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
          }
        }
      }
    });

    // read updated networks
    const { readNetworks, networks } = this.props;
    readNetworks({
      onSuccess: payload => {
        if (
          !networks.updated ||
          payload.networks.length === 0 ||
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
  }

  forceUpdateLocalNetworks = networks => {
    const { setNetworks } = this.props;
    const newNetworks = [];
    networks.forEach(network => {
      const newNetwork = {
        ...network,
        members: this.getMembersByIds(network.members)
      };
      newNetworks.push(newNetwork);
    });
    setNetworks({
      updated: getLatestUpdateFromArray(networks).toString(),
      networks: newNetworks
    });
    this.setState({ networks: newNetworks });
  };

  getMembersByIds = members => {
    const { users } = this.context;
    const membersWithFullData = members.map(memberId => {
      const thisUser = users.users.find(user => user._id === memberId);
      return thisUser;
    });
    return membersWithFullData;
  };

  callback = (network, action) => {
    const { setNetworks, networks, setContacts } = this.props;
    let newNetworks = JSON.stringify(networks);
    newNetworks = JSON.parse(newNetworks).networks || [];

    if (action === 'edit') {
      const index = newNetworks.findIndex(item => item._id === network._id);
      newNetworks[index] = network;
    } else if (action === 'remove') {
      newNetworks = newNetworks.filter(item => item._id !== network._id);
    } else if (action === 'new') {
      const newNetwork = {
        ...network,
        members: this.getMembersByIds(network.members)
      };
      newNetworks.push(newNetwork);
    }
    setNetworks({ networks: newNetworks });
    this.setState({ networks: newNetworks });
    setContacts({});
  };

  render() {
    const { formatMessage } = this.context;
    const { networks } = this.state;

    return (
      <App
        onBack={() => {
          Actions.feed();
        }}
      >
        <HeaderTitle>{formatMessage('feed.network.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <Section align="center">
          <H4 mt={15} mb={15}>
            {formatMessage('trust.network')}
          </H4>
          {networks &&
            networks.length > 0 &&
            networks.map(tn => (
              <TrustNetworkBox
                key={`${tn._id}`}
                data={tn}
                callback={this.callback}
              />
            ))}
          <AddNew
            onPress={() => {
              Actions['feed.network.create']({
                callback: this.callback
              });
            }}
          />
        </Section>
        <PendingRequests callback={this.callback} />
      </App>
    );
  }
}

const mapStateToProps = state => ({
  networks: getSelector('network', 'networks')(state)
});

const mapDispatchToProps = dispatch => ({
  readNetworks: payload => dispatch(readNetworks(payload)),
  setNetworks: payload => dispatch(setNetworks(payload)),
  setContacts: payload => dispatch(setContacts(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkMain);
