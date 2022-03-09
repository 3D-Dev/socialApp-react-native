import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { updateNetwork } from 'redux/network/actions';
import { addContact, setContacts } from 'redux/contact/actions';
import { App } from 'components';
import { HeaderTitle, HeaderRight, Section } from 'elements';
import { removeDuplicates } from 'utils/feedback';

import { TrustNetworkBox, AddNew } from '../_components';

class ManageTrustNetworks extends Component {
  static propTypes = {
    selectedUser: PropTypes.shape({
      _id: PropTypes.string
    }),
    networks: PropTypes.shape({
      networks: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    updateNetwork: PropTypes.func.isRequired,

    // for contact
    addContact: PropTypes.func.isRequired,
    setContacts: PropTypes.func.isRequired,
    contacts: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    callback: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    profileData: PropTypes.shape({
      _id: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    callback: () => {},
    selectedUser: {}
  };

  AddUserToMyNetwork = network => {
    const { selectedUser } = this.props;
    const memberIds = network.members.map(item => item._id);
    memberIds.push(selectedUser._id);
    const newNetwork = {
      ...network,
      members: removeDuplicates(memberIds)
    };

    const { updateNetwork } = this.props;
    updateNetwork(network._id, {
      ...newNetwork,
      onSuccess: p => {
        console.log('network update success', p);
        this.addThisUserToMyContact();
      },
      onFailure: e => {
        console.log('network update failure', e);
      }
    });
  };

  addThisUserToMyContact = () => {
    const { addContact, selectedUser } = this.props;

    addContact({
      joiner: selectedUser._id,
      onSuccess: () => {
        const { contacts, setContacts } = this.props;
        let newContacts = JSON.stringify(contacts);
        newContacts = JSON.parse(newContacts).contacts || [];

        let thisIndex = 0;
        if (newContacts.length > 0) {
          thisIndex = newContacts.findIndex(
            item => item.joiner === selectedUser._id && item.status === 0
          );
        }
        newContacts[thisIndex] = {
          ...newContacts[thisIndex],
          status: 1
        };
        setContacts({ contacts: newContacts });
        Actions['feed.network']();
      },
      onFailure: e => {
        console.log(e);
      }
    });
  };

  render() {
    const { formatMessage } = this.context;
    const { selectedUser, networks, callback } = this.props;

    let newNetworks = JSON.stringify(networks);
    newNetworks = JSON.parse(newNetworks).networks || [];

    return (
      <App>
        <HeaderTitle>
          {formatMessage('feed.network.add.headerTitle')}
        </HeaderTitle>
        <HeaderRight />
        <Section>
          {newNetworks &&
            newNetworks.length > 0 &&
            newNetworks.map(tn => (
              <TrustNetworkBox
                key={`${tn._id}`}
                data={tn}
                isAdding
                callback={() => {
                  this.AddUserToMyNetwork(tn);
                }}
              />
            ))}

          <AddNew
            onPress={() => {
              Actions['feed.network.create']({
                withThisUser: selectedUser,
                callback
              });
            }}
          />
        </Section>
      </App>
    );
  }
}

// export default ManageTrustNetworks;
const mapStateToProps = state => ({
  networks: getSelector('network', 'networks')(state),
  contacts: getSelector('contact', 'contacts')(state)
});

const mapDispatchToProps = dispatch => ({
  updateNetwork: (id, payload) => dispatch(updateNetwork(id, payload)),
  addContact: payload => dispatch(addContact(payload)),
  setContacts: payload => dispatch(setContacts(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTrustNetworks);
