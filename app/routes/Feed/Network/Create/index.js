import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { createNetwork, setNetworks } from 'redux/network/actions';
import { App, LoadUsers, Tags, Vulnerability } from 'components';
import {
  Section,
  HeaderTitle,
  HeaderRight,
  HeaderButton,
  H4,
  TextInput
} from 'elements';

import { UserListDropdown, PermissionCheckGroup } from '../_components';

const CenteredRow = styled.View`
  width: 100%;
  text-align: center;
`;

const Container = styled.View`
  width: 100%;
  padding: 10px;
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
    createNetwork: PropTypes.func.isRequired,
    withThisUser: PropTypes.shape({
      _id: PropTypes.string
    }),
    networks: PropTypes.shape({
      networks: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    callback: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    users: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    withThisUser: {},
    callback: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      trustnetwork: {
        name: '',
        permissions: [],
        members:
          props.withThisUser && props.withThisUser._id
            ? [props.withThisUser]
            : [],
        tags: [],
        vulnerability: 1
      },
      isDialogOpened: false
    };
  }

  onChangeHandler = field => text => {
    const { trustnetwork } = this.state;
    this.setState({
      trustnetwork: {
        ...trustnetwork,
        [field]: text
      }
    });
  };

  removeUser = userId => {
    const { trustnetwork } = this.state;
    const newUsers = trustnetwork.members.filter(user => user._id !== userId);
    this.setState({
      trustnetwork: {
        ...trustnetwork,
        members: newUsers
      }
    });
  };

  fieldsUpdated = (type, res) => {
    const { trustnetwork } = this.state;
    trustnetwork[type] = res;
    this.setState({ trustnetwork });
  };

  onAccept = () => {
    const { trustnetwork } = this.state;
    const { members } = trustnetwork;
    const newTrustNetwork = {
      ...trustnetwork,
      members: members.map(item => item._id)
    };

    const { createNetwork, callback } = this.props;
    createNetwork({
      ...newTrustNetwork,
      onSuccess: p => {
        callback(p.network, 'new');
        Actions.pop();
      },
      onFailure: e => {
        console.log('createNetwork onFailure', e);
      }
    });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { trustnetwork, isDialogOpened } = this.state;

    const allFilled =
      trustnetwork.name !== '' && trustnetwork.permissions.length > 0;

    return (
      <App>
        <LoadUsers />
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
            <H4 align="left" mb={5}>
              {formatMessage('feed.network.edit.nameofgrouo')}
            </H4>
            <TextInput
              value={trustnetwork.name}
              placeholder={formatMessage(
                'feed.network.edit.placeholderOfNameInput'
              )}
              onChangeText={this.onChangeHandler('name')}
            />

            <MemberTitleArea>
              <H4 align="left">
                {`${formatMessage('feed.network.edit.members')} - ${
                  trustnetwork.members ? trustnetwork.members.length : 0
                }`}
              </H4>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isDialogOpened: true });
                  return Actions['user.search']({
                    selectedUsers: trustnetwork.members,
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
              users={trustnetwork.members}
              onPress={this.removeUser}
            />

            <PermissionCheckGroup
              permissions={trustnetwork.permissions}
              callback={res => this.fieldsUpdated('permissions', res)}
            />
            <Tags callback={this.fieldsUpdated} />

            <Vulnerability
              defaultValue={trustnetwork.vulnerability}
              callback={res => this.fieldsUpdated('vulnerability', res)}
            />
          </Container>
        </Section>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  networks: getSelector('network', 'networks')(state)
});

const mapDispatchToProps = dispatch => ({
  createNetwork: payload => dispatch(createNetwork(payload)),
  setNetworks: payload => dispatch(setNetworks(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrustNetwork);
