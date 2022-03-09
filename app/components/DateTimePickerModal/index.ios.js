import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Appearance } from 'react-native-appearance';

class DateTimePicker extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.string
  };

  static defaultProps = {
    minimumDate: new Date(),
    mode: 'date'
  };

  render() {
    return (
      <DateTimePickerModal
        {...this.props}
        isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
      />
    );
  }
}

export default DateTimePicker;
