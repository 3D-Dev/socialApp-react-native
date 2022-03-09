import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { App } from 'components';
import { H2, H4, RoundButton } from 'elements';

import { Container, VerticalCentered } from '../_components/layout';

const TitleContainer = styled.View`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  margin: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class ReflectionPoints extends Component {
  static contextTypes = {
    formatMessage: PropTypes.func,
    appSettings: PropTypes.shape(),
    setAppSettings: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  onClick = type => {
    const { appSettings, setAppSettings } = this.context;
    setAppSettings({
      ...appSettings,
      appType: type
    });
    return Actions['welcome.explain']();
  };

  render() {
    const { formatMessage, currentTheme } = this.context;

    return (
      <App hasHeader={false} hasFooter={false}>
        <Container>
          <VerticalCentered>
            <TitleContainer>
              <H2 mr={10} mb={0}>
                {formatMessage('welcome.reflectionpoints.title')}
              </H2>
              <MaterialCommunityIcons
                name="star-four-points-outline"
                size={36}
                color={currentTheme.COLORS.PRIMARY}
              />
            </TitleContainer>

            <H4 mt={35}>
              {formatMessage('welcome.reflectionpoints.displayText')}
            </H4>
            <ButtonContainer>
              <RoundButton
                isFullWidth
                onPress={() => {
                  this.onClick('gamify');
                }}
              >
                <H4>
                  {formatMessage('welcome.reflectionpoints.buttons.continue')}
                </H4>
              </RoundButton>

              <RoundButton
                mt={0}
                isFullWidth
                onPress={() => {
                  this.onClick('normal');
                }}
              >
                <H4>
                  {formatMessage(
                    'welcome.reflectionpoints.buttons.turnoffpoints'
                  )}
                </H4>
              </RoundButton>
            </ButtonContainer>
          </VerticalCentered>
        </Container>
      </App>
    );
  }
}

export default ReflectionPoints;
