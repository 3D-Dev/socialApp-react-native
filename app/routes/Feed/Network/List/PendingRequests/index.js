import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import {
  readContacts,
  setContacts,
  addContact,
  removeContact
} from 'redux/contact/actions';
import { Section, H4, SmallText, Avatar, NoAvatar, Text } from 'elements';
import { retrieveMyContacts } from 'utils/contact';

const UserListWrapper = styled.View`
  width: ${({ width }) => width}px;
  max-height: ${({ height }) => (height ? `${height}px` : '400px')};
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 10px;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FullWidthFlatList = styled.FlatList`
  width: 100%;
`;

const UserItem = styled.View`
  flex-direction: row;
  padding-vertical: 5;
  align-items: center;
  width: 100%;
`;

const FullText = styled(Text)`
  flex: 1;
`;

const EditButton = styled.TouchableOpacity`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  padding: 5px 10px;
  width: 85px;
  margin: 5px 0px 5px 10px;
`;

const ButtonsConter = styled.View``;

class TrustNetworks extends Component {
  static propTypes = {
    readContacts: PropTypes.func.isRequired,
    setContacts: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
    // addContact: PropTypes.func.isRequired,
    contacts: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    callback: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    users: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired
  };

  constructor(props, context) {
    super(props);
    this.state = {
      pendingUsers: retrieveMyContacts(props.contacts, context.users, 0)
    };
  }

  componentWillMount() {
    const { readContacts, contacts } = this.props;
    readContacts({
      onSuccess: payload => {
        if (
          !contacts.updated ||
          payload.contacts.length === 0 ||
          new Date(payload.updated) > new Date(contacts.updated)
        ) {
          const { setContacts } = this.props;
          const { users } = this.context;
          setContacts(payload);
          this.setState({
            pendingUsers: retrieveMyContacts(payload, users, 0)
          });
        }
      }
    });
  }

  decline = id => {
    const { removeContact, setContacts } = this.props;
    removeContact(id, {
      onSuccess: () => {
        const { users } = this.context;
        const { contacts } = this.props;
        let newContacts = [];
        if (contacts && contacts.contacts && contacts.contacts.length > 0) {
          newContacts = contacts.contacts.filter(item => item._id !== id);
        }

        setContacts({ contacts: newContacts });
        this.setState({
          pendingUsers: retrieveMyContacts(newContacts, users, 0)
        });
      },
      onFailure: e => {
        console.log(e);
      }
    });
  };

  render() {
    const { formatMessage } = this.context;
    const { pendingUsers } = this.state;
    const { callback } = this.props;

    return (
      <Section align="left">
        <H4 align="left" ml={10} mt={20} mb={0}>
          {formatMessage('feedback.pending.displayText1')}
        </H4>
        <Text align="left" ml={10} mb={20}>
          {formatMessage('feed.contact.pending.displayText')}
        </Text>
        {pendingUsers.length > 0 && (
          <UserListWrapper width={300} height={300}>
            <FullWidthFlatList
              data={pendingUsers}
              renderItem={({ item }) => {
                const user = item.joiner;
                return (
                  <UserItem key={uuid.v4()}>
                    {user.avatar ? (
                      <Avatar source={user.avatar} size={50} mr={10} />
                    ) : (
                      <NoAvatar size={50} mr={10} />
                    )}

                    <FullText align="left">{user.name}</FullText>
                    <ButtonsConter>
                      <EditButton
                        onPress={() => {
                          return Actions['feed.network.add']({
                            selectedUser: user,
                            callback
                          });
                        }}
                      >
                        <SmallText mb={0}>Add</SmallText>
                      </EditButton>
                      <EditButton
                        onPress={() => {
                          this.decline(item._id);
                        }}
                      >
                        <SmallText mb={0}>Remove</SmallText>
                      </EditButton>
                    </ButtonsConter>
                  </UserItem>
                );
              }}
              keyExtractor={item => {
                return `${item.user_id}_${uuid.v4()}`;
              }}
            />
          </UserListWrapper>
        )}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getSelector('contact', 'contacts')(state)
});

const mapDispatchToProps = dispatch => ({
  readContacts: payload => dispatch(readContacts(payload)),
  setContacts: payload => dispatch(setContacts(payload)),
  removeContact: (id, payload) => dispatch(removeContact(id, payload)),
  addContact: payload => dispatch(addContact(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrustNetworks);
