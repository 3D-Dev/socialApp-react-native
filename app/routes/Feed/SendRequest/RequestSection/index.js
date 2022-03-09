import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { requestContact } from 'redux/contact/actions';
import { Avatar, NoAvatar, H6, Section, RoundButton } from 'elements';
import { FlatListWithEnd, DisplayModal } from 'components';

const ModalRoundButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BG};
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-width: 1;
  border-radius: 10;
  width: 100px;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
`;

const DisplayText = styled.Text`
  color: ${props => props.color};
  margin: 10px 20px 10px;
  font-size: 18px;
  justify-content: center;
  align-items: center;
`;

class RequestSection extends Component {
  static propTypes = {
    selectedUser: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }),
    requests: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired,
    requestContact: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    selectedUser: {}
  };

  state = {
    modalVisible: false,
    displayText: ''
  };

  sendRequests = () => {
    const { selectedUser, requestContact } = this.props;
    requestContact({
      to: selectedUser._id,
      onSuccess: this.sendRequestSuccess,
      onFailure: e => {
        this.setState({ displayText: e, modalVisible: true });
      }
    });
  };

  sendRequestSuccess = p => {
    const { selectedUser, updateStatus, requests } = this.props;
    const requestsObject = JSON.stringify(requests);
    const newContacts = JSON.parse(requestsObject).contacts || [];
    newContacts.push({
      ...selectedUser,
      status: 0
    });
    updateStatus({
      contacts: newContacts
    });

    const { formatMessage } = this.context;
    this.setState({
      modalVisible: true,
      displayText:
        p.member.status === 1
          ? formatMessage('"feed.send.contact.exist"')
          : formatMessage('send.request.success.modal.text', {
              name: selectedUser.name || 'unnamed'
            })
    });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { selectedUser } = this.props;
    const data = [selectedUser];
    const { modalVisible, displayText } = this.state;

    return (
      <Section>
        <FlatListWithEnd
          extraData={this.props}
          inverted
          horizontal
          scrollEnabled
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => {
            if (item) {
              return (
                <View
                  style={{
                    padding: 10,
                    maxWidth: 120,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {item.avatar ? (
                    <Avatar source={item.avatar} size={80} />
                  ) : (
                    <NoAvatar size={80} />
                  )}

                  <View style={{ maxWidth: 100 }}>
                    <H6>{item.name || 'unanmed'}</H6>
                  </View>
                </View>
              );
            }
            return <View />;
          }}
        />
        <H6>{formatMessage('feed.contact.displayText')}</H6>

        <RoundButton onPress={this.sendRequests}>
          <H6>{formatMessage('yes')}</H6>
        </RoundButton>
        <DisplayModal
          modalVisible={modalVisible}
          callback={() => {
            this.setState({
              modalVisible: !modalVisible
            });
          }}
        >
          <View>
            <DisplayText color={currentTheme.COLORS.PRIMARY}>
              {displayText}
            </DisplayText>
            <ModalRoundButton
              onPress={() => {
                this.setState({
                  modalVisible: !modalVisible
                });
              }}
            >
              <DisplayText color={currentTheme.COLORS.PRIMARY}>
                {formatMessage('modal.ok')}
              </DisplayText>
            </ModalRoundButton>
          </View>
        </DisplayModal>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  requests: getSelector('contact', 'requests')(state)
});

const mapDispatchToProps = dispatch => ({
  requestContact: payload => dispatch(requestContact(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestSection);
