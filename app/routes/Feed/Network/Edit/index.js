import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import {
  removeNetwork,
  updateNetwork,
  setNetworks
} from 'redux/network/actions';
import { App, Tags, Vulnerability } from 'components';
import {
  HeaderTitle,
  HeaderRight,
  Section,
  H4,
  HeaderButton,
  H5,
  TextInput,
  RoundButton
} from 'elements';
import { removeDuplicates } from 'utils/feedback';

import { UserListDropdown, PermissionCheckGroup } from '../_components';

const CenteredRow = styled.View`
  width: 100%;
  text-align: center;
`;

const Container = styled.View`
  width: 100%;
  padding-vertical: 20px;
  text-align: center;
`;

const MemberTitleArea = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 5px;
  align-items: center;
`;

class AddTrustNetwork extends Component {
  static propTypes = {
    network: PropTypes.shape({}).isRequired,
    removeNetwork: PropTypes.func.isRequired,
    updateNetwork: PropTypes.func.isRequired,
    networks: PropTypes.shape({
      networks: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    callback: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    profileData: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    callback: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      network: props.network,
      isDialogOpened: false
    };
  }

  removenetwork = () => {
    const { network } = this.state;
    const { removeNetwork, callback } = this.props;
    removeNetwork(network._id, {
      onSuccess: () => {
        callback(network, 'remove');
        Actions.pop();
      },
      onFailure: e => {
        console.log('network delte failure', e);
      }
    });
  };

  onChangeHandler = field => text => {
    const { network } = this.state;
    this.setState({
      network: {
        ...network,
        [field]: text
      }
    });
  };

  removeUser = userId => {
    const { network } = this.state;
    const newUsers = network.members.filter(user => user._id !== userId);
    this.setState({
      network: {
        ...network,
        members: newUsers
      }
    });
  };

  fieldsUpdated = (type, res) => {
    const { network } = this.state;
    network[type] = res;
    this.setState({ network });
  };

  onAccept = () => {
    const { network } = this.state;
    const memberIds = network.members.map(item => item._id);
    const newNetwork = {
      ...network,
      members: removeDuplicates(memberIds)
    };

    const { updateNetwork, callback } = this.props;
    updateNetwork(network._id, {
      ...newNetwork,
      onSuccess: p => {
        console.log('network update success', p);
        callback(network, 'edit');
        Actions.pop();
      },
      onFailure: e => {
        console.log('network update failure', e);
      }
    });
  };

  render() {
    const { formatMessage, currentTheme, profileData } = this.context;
    const { network, isDialogOpened } = this.state;
    const allFilled = network.name !== '' && network.permissions.length > 0;

    const membersExceptMe = network.members.filter(
      item => item._id !== profileData._id
    );

    return (
      <App>
        <HeaderTitle>
          {formatMessage('feed.network.edit.headerTitle')}
        </HeaderTitle>
        {!isDialogOpened && (
          <HeaderRight>
            <HeaderButton onPress={this.onAccept} disabled={!allFilled}>
              {formatMessage('add.acceptButton')}
            </HeaderButton>
          </HeaderRight>
        )}

        <Section align="left">
          <Container>
            <CenteredRow>
              <H4 mb={25}>{formatMessage('trust.network')}</H4>
            </CenteredRow>
            <H5 align="left" mb={5}>
              {formatMessage('feed.network.edit.nameofgrouo')}
            </H5>
            <TextInput
              value={network.name}
              placeholder={formatMessage(
                'feed.network.edit.placeholderOfNameInput'
              )}
              onChangeText={this.onChangeHandler('name')}
            />

            <MemberTitleArea>
              <H5 align="left">
                {`${formatMessage('feed.network.edit.members')} - ${
                  membersExceptMe.length
                }`}
              </H5>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isDialogOpened: true });
                  return Actions['user.search']({
                    selectedUsers: network.members,
                    callback: res => this.fieldsUpdated('members', res),
                    setModalStatus: status => {
                      this.setState({
                        isDialogOpened: status
                      });
                    }
                  });
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </TouchableOpacity>
            </MemberTitleArea>

            <UserListDropdown
              users={membersExceptMe}
              onPress={this.removeUser}
            />

            <PermissionCheckGroup
              permissions={network.permissions}
              callback={res => this.fieldsUpdated('permissions', res)}
            />
            <Tags
              callback={this.fieldsUpdated}
              defaultTags={network.tags || []}
            />

            <Vulnerability
              defaultValue={network.vulnerability}
              callback={res => this.fieldsUpdated('vulnerability', res)}
            />
          </Container>
        </Section>

        <RoundButton onPress={this.removenetwork} danger>
          <H5>{formatMessage('trustnetwork.delete')}</H5>
        </RoundButton>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  networks: getSelector('network', 'networks')(state)
});

const mapDispatchToProps = dispatch => ({
  removeNetwork: (id, payload) => dispatch(removeNetwork(id, payload)),
  updateNetwork: (id, payload) => dispatch(updateNetwork(id, payload)),
  setNetworks: payload => dispatch(setNetworks(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrustNetwork);
