import React from 'react';
import PropTypes from 'prop-types';
import RNCheckBox from 'react-native-check-box';

const CheckBox = (props, { currentTheme }) => (
  <RNCheckBox checkBoxColor={currentTheme.COLORS.BORDER} {...props} />
);

CheckBox.contextTypes = {
  currentTheme: PropTypes.shape()
};
export default CheckBox;
