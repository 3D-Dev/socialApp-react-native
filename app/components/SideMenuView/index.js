import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import Drawer from 'react-native-drawer';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { HeaderRight, HeaderTitle } from 'elements';
import App from '../App';

export const Content = styled(ScrollView)`
  background-color: ${props => props.theme.COLORS.PRIMARY_BG};
  border: 1px solid ${props => props.theme.COLORS.BORDER};
`;

export default class SideMenuView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    sideMenu: PropTypes.node.isRequired,
    side: PropTypes.string,
    headerTitle: PropTypes.string,
    bgColor: PropTypes.string,
    hasBack: PropTypes.bool,
    type: PropTypes.string
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    side: 'right',
    headerTitle: '',
    type: 'overlay',
    bgColor: '',
    hasBack: true
  };

  constructor(props) {
    super(props);
    this.drawerOpen = false;
  }

  state = {
    drawerDisabled: false
  };

  onMenuClicked = () => {
    if (!this.drawerOpen) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
    this.drawerOpen = !this.drawerOpen;
  };

  render() {
    const { drawerDisabled } = this.state;
    const { currentTheme } = this.context;
    const {
      sideMenu,
      children,
      side,
      headerTitle,
      type,
      bgColor,
      hasBack
    } = this.props;

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        type={type}
        content={sideMenu}
        acceptDoubleTap
        styles={{
          main: {
            shadowOpacity: 0.3,
            shadowRadius: 15
          },
          drawer: {
            marginTop: getStatusBarHeight() + 60
          }
        }}
        onOpen={() => {
          this.drawerOpen = true;
        }}
        onClose={() => {
          this.drawerOpen = false;
        }}
        tapToClose
        tweenDuration={100}
        panThreshold={0.08}
        disabled={drawerDisabled}
        openDrawerOffset={() => {
          return 50;
        }}
        negotiatePan
        side={side}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <App forceBgColor={bgColor} hasBack={hasBack}>
          <HeaderTitle>{headerTitle}</HeaderTitle>
          <HeaderRight>
            <TouchableOpacity onPress={this.onMenuClicked}>
              <MaterialIcons
                name="menu"
                size={32}
                color={currentTheme.COLORS.NAVBAR}
              />
            </TouchableOpacity>
          </HeaderRight>
          {children}
        </App>
      </Drawer>
    );
  }
}
