import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { H4, Section, RoundButton } from 'elements';
import { App, LoadUsers } from 'components';

import SignInSuccess from 'assets/images/icons/signin_success.png';

const Container = styled.View`
  padding: 0px 20px;
`;

const SuccessImage = styled.Image`
  margin: 20px auto;
`;

const Welcome = ({}, { formatMessage }) => {
  return (
    <App hasFooter>
      <LoadUsers />
      <Section>
        <Container>
          <H4 mb={20} mt={40}>
            {formatMessage('auth.welcome.displayText')}
          </H4>

          <RoundButton
            onPress={() => {
              Actions['feed.contact']();
            }}
          >
            <H4>{formatMessage('feed.menu.send.request')}</H4>
          </RoundButton>

          <H4 mb={20} mt={40}>
            {formatMessage('auth.welcome.trustnetwork.displayText')}
          </H4>

          <RoundButton
            onPress={() => {
              Actions['feed.network']();
            }}
          >
            <H4>{formatMessage('feed.menu.manage.trust.network')}</H4>
          </RoundButton>

          <SuccessImage source={SignInSuccess} width={130} />
        </Container>
      </Section>
    </App>
  );
};

Welcome.contextTypes = {
  formatMessage: PropTypes.func
};

export default Welcome;
