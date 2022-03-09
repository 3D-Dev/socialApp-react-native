import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { App } from 'components';
import { HeaderTitle, HeaderRight, H1, H5, Section } from 'elements';

import {
  AvatarUpload,
  QRArea,
  HorizontalRibbons
  // FeedbackHorizontal
} from 'routes/Profile/_components';

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

class OtherProfile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      user_id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    }).isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    reflections: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      info: {
        points: 0,
        reflections: 0,
        awards: 0,
        skillEndorsements: 0
      },
      values: props.reflections.filter(({ type }) => type === 'Value'),
      manuals: props.reflections.filter(({ type }) => type === 'Manual'),
      goals: props.reflections.filter(({ type }) => type === 'Goal')
    };
  }

  render() {
    const { formatMessage } = this.context;
    const { values, manuals, goals, info } = this.state;
    const { user, permissions } = this.props;

    let permissionText = '';
    for (let i = 0; i < permissions.length; i++) {
      const separator = i !== permissions.length - 1 ? ', ' : ' ';
      permissionText = permissionText.concat(`${permissions[i]}${separator}`);
    }

    return (
      <App>
        <HeaderTitle>{formatMessage('profile.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <Section style={{ paddingBottom: 0 }}>
          <H5 mt={20}>
            {formatMessage('feed.permissions.displayText', {
              permissions: permissionText
            })}
          </H5>
        </Section>
        <QRArea name={user.name} user_id={user.user_id} editable={false} />
        <InformationArea>
          <ImageWrapper>
            <AvatarUpload image={user.avatar} justShow />
          </ImageWrapper>

          {info && (
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
          )}
        </InformationArea>
        <Contents>
          {permissions.includes('Value') && (
            <HorizontalRibbons type="Value" contents={values} justShow />
          )}
          {permissions.includes('Manual') && (
            <HorizontalRibbons type="Manual" contents={manuals} justShow />
          )}
          {permissions.includes('Goal') && (
            <HorizontalRibbons type="Goal" contents={goals} justShow />
          )}
        </Contents>
      </App>
    );
  }
}

export default OtherProfile;
