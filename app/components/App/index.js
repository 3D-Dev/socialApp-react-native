import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Container as NBContainer } from 'native-base';
import styled from 'styled-components';
import { noop } from 'lodash';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Spinner from 'react-native-loading-spinner-overlay';

import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import Notification from './Notification';

export const Container = styled(NBContainer)`
  height: 100%;
  background-color: ${({ theme, forceBgColor }) =>
    forceBgColor || theme.COLORS.PRIMARY_BG};
  ${({ loading }) => loading && 'opacity: 0.5;'}
`;

class App extends Component {
  static propTypes = {
    hasHeader: PropTypes.bool,
    hasFooter: PropTypes.bool,
    headerTransparent: PropTypes.bool,
    loading: PropTypes.bool,
    isScrollContent: PropTypes.bool,
    onBack: PropTypes.func,
    children: PropTypes.node.isRequired,
    forceBgColor: PropTypes.string,
    hasBack: PropTypes.bool
  };

  static contextTypes = {
    appSettings: PropTypes.shape(),
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    hasHeader: true,
    hasFooter: true,
    headerTransparent: false,
    loading: false,
    isScrollContent: true,
    onBack: noop,
    forceBgColor: '',
    hasBack: true
  };

  render() {
    const { appSettings, formatMessage, currentTheme } = this.context;
    const {
      children,
      hasHeader,
      hasFooter,
      loading,
      onBack,
      isScrollContent,
      forceBgColor,
      hasBack
    } = this.props;

    return (
      <Container
        forceBgColor={forceBgColor}
        loading={loading}
        {...(loading ? { pointerEvents: 'none' } : {})}
      >
        <Spinner
          visible={appSettings.syncing}
          textContent={formatMessage('syncing')}
          textStyle={{
            color: currentTheme.COLORS.PRIMARY
          }}
        />
        <StatusBar barStyle="light-content" />
        {Boolean(hasHeader) && (
          <Header onBack={onBack} hasBack={hasBack} isIphoneX={isIphoneX()} />
        )}
        <Content isScrollContent={isScrollContent}>{children}</Content>
        {Boolean(hasFooter) && <Footer isIphoneX={isIphoneX()} />}
        <Notification />
      </Container>
    );
  }
}

export default App;
