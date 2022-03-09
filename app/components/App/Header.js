import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import styled from 'styled-components';
import { noop } from 'lodash';
import { TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { H5 } from 'elements';
import { getSelector } from 'redux/selectors';
import immutableToJS from 'utils/immutableToJS';

import GradientBGWrapper from '../GradientBGWrapper';

const HeaderWrapper = styled.View`
  display: flex;
  background-color: ${({ theme }) => theme.COLORS.NAVBAR_BG || 'transparent'};
  align-items: flex-end;
  justify-content: center;
  padding-horizontal: 20;
  padding-bottom: 10;
  width: 100%;
  height: ${({ isIphoneX }) => {
    const normalHeight = getStatusBarHeight() + 55;
    return isIphoneX ? normalHeight + 10 : normalHeight;
  }}
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${getStatusBarHeight()};
`;

const HeaderLeftWrapper = styled(TouchableOpacity)`
  width: 80;
`;

const HeaderRightWrapper = styled(View)`
  width: 80;
  align-items: flex-end;
`;

const Header = (
  { headerTitle, headerRight, onBack, isIphoneX, hasBack },
  { formatMessage, currentTheme }
) => {
  const HeaderContent = (
    <HeaderWrapper
      HEADER_BG={currentTheme.COLORS.NAVBAR_BG || ''}
      isIphoneX={isIphoneX}
    >
      {hasBack ? (
        <HeaderLeftWrapper
          onPress={() => {
            Actions.pop();
            onBack();
          }}
        >
          <H5 mb={5} align="left" color={currentTheme.COLORS.NAVBAR}>
            {formatMessage('header.back')}
          </H5>
        </HeaderLeftWrapper>
      ) : (
        <HeaderLeftWrapper />
      )}

      <H5 mb={5} color={currentTheme.COLORS.NAVBAR}>
        {headerTitle}
      </H5>
      <HeaderRightWrapper>{headerRight}</HeaderRightWrapper>
    </HeaderWrapper>
  );
  if (currentTheme.COLORS.NAVBAR_BG) {
    return HeaderContent;
  }
  return <GradientBGWrapper>{HeaderContent}</GradientBGWrapper>;
};

Header.propTypes = {
  headerTitle: PropTypes.string,
  headerRight: PropTypes.node,
  onBack: PropTypes.func,
  isIphoneX: PropTypes.bool,
  hasBack: PropTypes.bool
};

Header.defaultProps = {
  headerTitle: '',
  headerRight: null,
  onBack: noop,
  isIphoneX: false,
  hasBack: true
};

Header.contextTypes = {
  formatMessage: PropTypes.func.isRequired,
  currentTheme: PropTypes.shape({
    COLORS: PropTypes.shape({
      NAVBAR: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  headerTitle: getSelector('ui', 'headerTitle')(state),
  headerRight: getSelector('ui', 'headerRight')(state)
});

export default compose(
  setDisplayName('Header'),
  connect(mapStateToProps),
  immutableToJS
)(Header);
