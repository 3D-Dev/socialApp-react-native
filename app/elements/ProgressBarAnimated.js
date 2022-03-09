import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress-bar-animated';

const ProgressBarAnimated = (props, { currentTheme }) => (
  <ProgressBar
    backgroundColor={currentTheme.COLORS.PRIMARY}
    borderColor={currentTheme.COLORS.BORDER}
    {...props}
  />
);

ProgressBarAnimated.contextTypes = {
  currentTheme: PropTypes.shape()
};

export default ProgressBarAnimated;
