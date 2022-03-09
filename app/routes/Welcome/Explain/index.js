import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { App } from 'components';
import { H4, RoundButton } from 'elements';
import { PlusSVG, UsersSVG, UserSolidSVG } from 'elements/icons';

import { Container, VerticalCentered } from '../_components/layout';

const ButtonContainer = styled.View`
  margin: 30px;
`;

const IconArea = styled(Col)`
  width: 90;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const TextArea = styled(Col)`
  align-items: center;
  flex-direction: row;
  padding-right: 20px;
`;

const RowWithMarginTop = styled(Row)`
  margin-vertical: 30px;
`;

const Explain = (
  {},
  { formatMessage, currentTheme, appSettings, setAppSettings }
) => {
  return (
    <App hasHeader={false} hasFooter={false}>
      <Container>
        <VerticalCentered paddingSize="20px 0px">
          <RowWithMarginTop>
            <IconArea>
              <PlusSVG size={38} color={currentTheme.COLORS.PRIMARY} />
            </IconArea>
            <TextArea>
              <H4>
                {`${formatMessage('welcome.explain.displayTextForAdd')} `}
                <H4 bold>
                  {formatMessage('welcome.explain.displayValue', {
                    value: 'User Manual'
                  })}
                </H4>
                {formatMessage('welcome.explain.and')}
                <H4 bold>
                  {`${formatMessage('welcome.explain.displayValue', {
                    value: 'Values'
                  })}`}
                </H4>
                <H4>{', '}</H4>
                <H4 bold>
                  {`${formatMessage('welcome.explain.displayValue', {
                    value: 'Request Feedback'
                  })}`}
                </H4>
                {formatMessage('welcome.explain.andset')}
                <H4 bold>
                  {formatMessage('welcome.explain.displayValue', {
                    value: 'Goals'
                  })}
                </H4>
                <H4>.</H4>
              </H4>
            </TextArea>
          </RowWithMarginTop>
          <RowWithMarginTop>
            <IconArea>
              <UserSolidSVG size={38} color={currentTheme.COLORS.PRIMARY} />
            </IconArea>
            <TextArea>
              <H4>{formatMessage('welcome.explain.displayTextForProfile')}</H4>
            </TextArea>
          </RowWithMarginTop>
          <RowWithMarginTop>
            <IconArea>
              <UsersSVG size={38} color={currentTheme.COLORS.PRIMARY} />
            </IconArea>
            <TextArea>
              <H4>{formatMessage('welcome.explain.displayTextForNetwork')}</H4>
            </TextArea>
          </RowWithMarginTop>
          <ButtonContainer>
            <RoundButton
              isFullWidth
              onPress={() => {
                setAppSettings({
                  ...appSettings,
                  isOpened: true
                });
                Actions.add();
              }}
            >
              <H4>
                {formatMessage('welcome.reflectionpoints.buttons.continue')}
              </H4>
            </RoundButton>
          </ButtonContainer>
        </VerticalCentered>
      </Container>
    </App>
  );
};

Explain.contextTypes = {
  formatMessage: PropTypes.func,
  currentTheme: PropTypes.shape(),
  appSettings: PropTypes.shape().isRequired,
  setAppSettings: PropTypes.func.isRequired
};

export default Explain;
