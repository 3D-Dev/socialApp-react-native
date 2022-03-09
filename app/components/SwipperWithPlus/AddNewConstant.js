import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { H4, H5, Section, RoundButton, TextInput } from 'elements';

import DisplayModal from '../DisplayModal';

class AddNewConstant extends Component {
  static propTypes = {
    values: PropTypes.arrayOf(Object).isRequired,
    constantName: PropTypes.string,
    callback: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    setConstantData: PropTypes.func.isRequired,
    constantData: PropTypes.shape({}).isRequired,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    constantName: 'value',
    callback: () => {}
  };

  state = {
    modalVisible: false,
    newValue: '',
    errorText: ''
  };

  addNewConstantValue = value => {
    const { constantName, callback } = this.props;
    const valueType = `${constantName}s`;
    const { constantData, setConstantData } = this.context;
    const newValues = constantData[valueType] || [];
    const newValue = {
      value: `new-value-${new Date().getTime()}`,
      label: value
    };
    newValues.push(newValue);
    constantData[valueType] = newValues;
    setConstantData(constantData);
    this.setState({ modalVisible: false });
    callback(newValue);
  };

  onAddNewConstant = () => {
    const { formatMessage } = this.context;
    const { newValue } = this.state;
    const { values } = this.props;
    if (newValue.length === 0) return;
    const find = values.find(value => value.label === newValue);
    if (find) {
      this.setState({
        errorText: formatMessage('add.new.constant.duplicateError')
      });
      return;
    }
    this.addNewConstantValue(newValue);
    this.setState({ modalVisible: false });
  };

  render() {
    const { modalVisible, newValue, errorText } = this.state;
    const { formatMessage, currentTheme } = this.context;
    const { constantName } = this.props;

    return (
      <View style={{ marginTop: 10 }}>
        <DisplayModal modalVisible={modalVisible} modalHeight={300}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
            style={{ position: 'absolute', right: 10, top: 10 }}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={25}
              color={currentTheme.COLORS.PRIMARY}
            />
          </TouchableOpacity>
          <Section>
            <H5 mb={20}>
              {formatMessage('add.new.constant.displayText', { constantName })}
            </H5>
            <TextInput
              onChange={ev => {
                this.setState({ newValue: ev.nativeEvent.text, errorText: '' });
              }}
              placeholderTextColor={currentTheme.COLORS.PRIMARY}
              value={newValue}
            />
            {errorText.length > 0 && (
              <H5 mt={20} style={{ color: 'red' }}>
                {errorText}
              </H5>
            )}
            <RoundButton mt={20} onPress={this.onAddNewConstant}>
              <H5>{formatMessage('add.addButton')}</H5>
            </RoundButton>
          </Section>
        </DisplayModal>

        <View style={{ alignItems: 'flex-end' }}>
          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: true, newValue: '' });
            }}
          >
            <H4>{formatMessage('add.new.constant')}</H4>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default AddNewConstant;
