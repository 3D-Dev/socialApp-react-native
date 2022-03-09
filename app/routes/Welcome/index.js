import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

import { App } from 'components';
import { H1, H4, RoundButton } from 'elements';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BorderArea = styled.View`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 66;
  margin: 60px 40px 20px 40px;
  padding-vertical: 40px;
`;

const DisplayText = styled(H4)`
  padding: 20px;
  margin-bottom: 40px;
`;

class Welcome extends Component {
  static contextTypes = {
    formatMessage: PropTypes.func.isRequired
  };

  render() {
    const { formatMessage } = this.context;
    return (
      <App hasHeader={false} hasFooter={false}>
        <Container>
          <BorderArea>
            <H1 mt={20} underline>
              {formatMessage('welcome.title')}
            </H1>

            <DisplayText>{formatMessage('welcome.displayText')}</DisplayText>

            <RoundButton
              hasDivider
              onPress={() => {
                return Actions['welcome.theme']();
              }}
              isFullWidth
            >
              <H4>{formatMessage('welcome.nextButtonText')}</H4>
            </RoundButton>
          </BorderArea>
        </Container>
      </App>
    );
  }
}

export default Welcome;
