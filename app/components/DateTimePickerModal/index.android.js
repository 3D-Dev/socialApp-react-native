import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class DateTimePicker extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.string,
    isDarkModeEnabled: PropTypes.bool
  };

  static defaultProps = {
    minimumDate: new Date(),
    mode: 'date',
    isDarkModeEnabled: true
  };

  render() {
    return <DateTimePickerModal {...this.props} />;
  }
}

export default DateTimePicker;
