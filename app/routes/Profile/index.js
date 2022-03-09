import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get as lodashGet } from 'lodash';

import { updateProfile } from 'redux/user/actions';
import { H1, H5 } from 'elements';
import { SideMenuView } from 'components';

import {
  SubMenuContent,
  AvatarUpload,
  QRArea,
  HorizontalRibbons,
  FeedbackHorizontal
} from './_components';

const InformationArea = styled.View`
  padding: 0px 20px 20px 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  max-height: 220px;
`;

const ImageWrapper = styled.View`
  width: 50%;
`;

const Information = styled.View`
  position: relative;
`;

const TextLine = styled.View`
  flex: 1;
  flex-direction: row-reverse;
  align-items: center;
`;

const Contents = styled.View`
  padding-vertical: 20px;
`;

class Profile extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    profileData: PropTypes.shape(),
    setProfileData: PropTypes.func,
    reflection: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    appSettings: PropTypes.shape()
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      info: context.profileData.info || {
        points: 0,
        reflections: 0,
        awards: 0,
        skillEndorsements: 0
      },
      values: context.reflection.filter(({ type }) => type === 'Value'),
      manuals: context.reflection.filter(({ type }) => type === 'Manual'),
      goals: context.reflection.filter(({ type }) => type === 'Goal'),
      activities: [],
      modalOpened: false
    };
  }

  componentDidMount() {
    const { appSettings, profileData, setProfileData } = this.context;
    const { updateProfile } = this.props;
    const pushToken = lodashGet(global.localStorage, 'pushToken');
    if (pushToken !== undefined) {
      const token = lodashGet(global.localStorage, 'tokenInfo.token');
      if (appSettings.online && token !== undefined) {
        updateProfile({
          ...profileData,
          pushToken,
          onSuccess: res => {
            console.log('api save result', res);
            setProfileData(res);
          },
          onFailure: e => {
            console.log('update profile api failed', e);
          }
        });
      } else {
        setProfileData({
          ...profileData,
          pushToken,
          updated: Date.now().toString()
        });
      }
    }
  }

  updateProfile = payload => {
    const { appSettings, profileData, setProfileData } = this.context;
    const { updateProfile } = this.props;
    const newProfileData = {
      ...profileData,
      ...payload
    };

    const token = lodashGet(global.localStorage, 'tokenInfo.token');
    if (appSettings.online && token !== undefined) {
      updateProfile({
        ...newProfileData,
        onSuccess: res => {
          console.log('api save result', res);
          setProfileData(res);
        },
        onFailure: e => {
          console.log('update profile api failed', e);
        }
      });
    } else {
      setProfileData({
        ...newProfileData,
        updated: Date.now().toString()
      });
    }
  };

  render() {
    const { formatMessage, profileData } = this.context;
    const {
      activities,
      values,
      manuals,
      goals,
      info,
      modalOpened
    } = this.state;

    return (
      <SideMenuView
        sideMenu={<SubMenuContent />}
        side="right"
        type="overlay"
        bgColor={modalOpened ? 'rgba(29, 25, 26, .9)' : ''}
        headerTitle={formatMessage('profile.headerTitle')}
        hasBack={false}
      >
        <QRArea
          name={profileData.name}
          user_id={profileData.user_id}
          updateName={name => {
            this.updateProfile({ name });
          }}
          updateUserId={user_id => {
            this.updateProfile({ user_id });
          }}
        />
        <InformationArea>
          <ImageWrapper>
            <AvatarUpload
              onChange={avatar => {
                this.updateProfile({ avatar });
              }}
              image={profileData.avatar}
            />
          </ImageWrapper>

          <Information>
            {Object.keys(info).map(key => {
              return (
                <TextLine key={key}>
                  <H1>{info[key]}</H1>
                  <H5 mb={0} mr={5}>
                    {formatMessage(`profile.${key}`)}
                    {':'}
                  </H5>
                </TextLine>
              );
            })}
          </Information>
        </InformationArea>

        <Contents>
          <HorizontalRibbons type="activity" contents={activities} />
          <HorizontalRibbons type="Value" contents={values} />
          <HorizontalRibbons type="Manual" contents={manuals} />
          {profileData._id && (
            <HorizontalRibbons type="Goal" contents={goals} />
          )}
          {profileData._id && <FeedbackHorizontal />}
        </Contents>
      </SideMenuView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateProfile: payload => dispatch(updateProfile(payload))
});

export default connect(null, mapDispatchToProps)(Profile);
