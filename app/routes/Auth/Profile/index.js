import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get as lodashGet } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { updateProfile } from 'redux/user/actions';
import {
  H4,
  Text,
  HeaderTitle,
  HeaderRight,
  Section,
  RoundButton,
  TextInput
} from 'elements';
import { App } from 'components';
import { AvatarUpload } from 'routes/Profile/_components';

const AvatarWrapper = styled.View`
  width: 180px;
  height: 180px;
  margin-horizontal: auto;
`;

class Profile extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    requireComplete: PropTypes.bool
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    profileData: PropTypes.shape(),
    setProfileData: PropTypes.func,
    appSettings: PropTypes.shape()
  };

  static defaultProps = {
    requireComplete: false
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: context.profileData ? context.profileData.name : '',
      user_id: context.profileData ? context.profileData.user_id : '',
      avatar: context.profileData ? context.profileData.avatar : ''
    };
  }

  createProfile = () => {
    const { avatar, name, user_id } = this.state;
    const { appSettings, profileData, setProfileData } = this.context;
    const { updateProfile } = this.props;

    const pushToken = lodashGet(global.localStorage, 'pushToken');
    const newProfileData =
      pushToken === undefined
        ? {
            ...profileData,
            avatar,
            name,
            user_id
          }
        : {
            ...profileData,
            avatar,
            name,
            user_id,
            pushToken
          };

    if (appSettings.online) {
      updateProfile({
        ...newProfileData,
        onSuccess: res => {
          setProfileData(res);
          console.log('update profile api succeeded');
          Actions['auth.welcome']();
        },
        onFailure: e => {
          console.log('update profile api failed', e);
        }
      });
    } else {
      setProfileData({
        ...newProfileData,
        avatar,
        name,
        user_id,
        pushToken,
        updated: Date.now().toString()
      });
    }
  };

  render() {
    const { avatar, name, user_id } = this.state;
    const { formatMessage, profileData } = this.context;
    const { requireComplete } = this.props;

    return (
      <App hasFooter={false}>
        <HeaderTitle />
        <HeaderRight />
        <Section>
          <H4 mb={20} mt={0}>
            {requireComplete
              ? formatMessage('auth.profile.requireComplete')
              : formatMessage('auth.profile.displayText')}
          </H4>
          <AvatarWrapper>
            <AvatarUpload
              onChange={image => {
                this.setState({ avatar: image });
              }}
              image={avatar}
            />
          </AvatarWrapper>
        </Section>
        <Section align="left">
          <H4 mt={10} mb={5}>
            {formatMessage('auth.profile.name.displayText')}
          </H4>
          <TextInput
            placeholder={formatMessage('auth.profile.name.placeHolder')}
            value={name}
            onChangeText={name => {
              this.setState({ name });
            }}
          />
        </Section>

        {profileData.user_id ? (
          <Section align="left">
            <H4 align="left" mb={5}>
              {`${formatMessage('auth.profile.user_id.stableUsername')}  `}
              <Text>{user_id}</Text>
            </H4>
          </Section>
        ) : (
          <Section align="left">
            <H4 mb={5}>{formatMessage('auth.profile.user_id.displayText')}</H4>
            <TextInput
              placeholder={formatMessage('auth.profile.user_id.placeHolder')}
              value={user_id}
              onChangeText={user_id => {
                this.setState({ user_id });
              }}
            />
          </Section>
        )}

        <RoundButton disabled={!name || !user_id} onPress={this.createProfile}>
          <H4>{formatMessage('finished')}</H4>
        </RoundButton>
      </App>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateProfile: payload => dispatch(updateProfile(payload))
});

export default connect(null, mapDispatchToProps)(Profile);
