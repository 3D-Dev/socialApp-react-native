import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewPropTypes } from 'react-native';

const GradientBGWrapper = ({ children, style }, { currentTheme }) => {
  if (currentTheme.COLORS.PRIMARY_GRADIENT_COLORS) {
    return (
      <LinearGradient
        colors={currentTheme.COLORS.PRIMARY_GRADIENT_COLORS}
        start={[0, 0]}
        end={[1, 0]}
        style={style}
      >
        {children}
      </LinearGradient>
    );
  }
  return children;
};

GradientBGWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style
};

GradientBGWrapper.contextTypes = {
  formatMessage: PropTypes.func.isRequired,
  currentTheme: PropTypes.shape()
};

GradientBGWrapper.defaultProps = {
  style: {}
};

export default GradientBGWrapper;
