import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { H4, H2, RoundButton } from 'elements';
import { App, Themes } from 'components';

import { Container, VerticalCentered } from '../_components/layout';

const ButtonArea = styled.View`
  padding-horizontal: 40;
  margin-top: 30px;
`;

const ColorScheme = ({}, { formatMessage }) => {
  return (
    <App hasHeader={false} hasFooter={false}>
      <Container>
        <VerticalCentered paddingSize="20px 0px">
          <H2 mb={30}>{formatMessage('welcome.theme.displayText')}</H2>
          <Themes />

          <ButtonArea>
            <RoundButton
              onPress={() => {
                return Actions['welcome.reflectionpoints']();
              }}
              isFullWidth
            >
              <H4>{formatMessage('button.next')}</H4>
            </RoundButton>
          </ButtonArea>
        </VerticalCentered>
      </Container>
    </App>
  );
};

ColorScheme.contextTypes = {
  formatMessage: PropTypes.func
};

export default ColorScheme;
