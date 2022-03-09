import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'lodash';

import { data as preData } from 'constants/mocha';
import { H4 } from 'elements';

import SwipePicker from '../SwipePicker';
import AddNewConstant from './AddNewConstant';

const PickerWrapper = styled.View`
  margin-top: 8;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

class SwipperWithPlus extends Component {
  static propTypes = {
    constantName: PropTypes.string,
    callback: PropTypes.func,
    defaultValue: PropTypes.string,
    isForSentence: PropTypes.bool
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    constantData: PropTypes.shape()
  };

  static defaultProps = {
    constantName: 'value',
    callback: () => {},
    defaultValue: '',
    isForSentence: false
  };

  constructor(props) {
    super(props);
    this.state = {
      valueType: `${props.constantName}s`,
      values: [],
      originalValues: [],
      selectedValue: props.defaultValue || '',
      item: {
        value: '',
        label: ''
      }
    };
  }

  componentWillMount() {
    const { formatMessage } = this.context;
    const { valueType } = this.state;
    const { defaultValue, constantName } = this.props;

    const values = preData[valueType].map(value => {
      const val = value.replace(/ /g, '_');
      return {
        value: val,
        label: capitalize(formatMessage(`mocha.${constantName}.${val}`))
      };
    });

    const { constantData } = this.context;
    const newValues = values.concat(constantData[valueType] || []);
    const selectedIndex = newValues.findIndex(
      item => item.value === defaultValue
    );

    this.setState({
      values: newValues,
      originalValues: values,
      item:
        selectedIndex > -1
          ? newValues[selectedIndex]
          : {
              value: '',
              label: ''
            }
    });
  }

  addNewConstant = newValue => {
    const { constantData } = this.context;
    const { valueType, originalValues } = this.state;
    const newValues = originalValues.concat(constantData[valueType] || []);
    this.setState({ values: newValues });
    this.onSelectedValue(newValue);
  };

  renderValueHeader = () => {
    const { formatMessage } = this.context;
    const { item, selectedValue } = this.state;
    const { constantName } = this.props;

    let text = '';

    if (selectedValue !== '' && item && item.value && item.value !== '') {
      text = item.value.includes('new')
        ? formatMessage('mocha.constantType', { constantType: item.label })
        : formatMessage(`mocha.${constantName}.${selectedValue}`);
    }

    return (
      <H4>
        {formatMessage(`add.${constantName}.heading`, {
          value: selectedValue ? text : '...'
        })}
      </H4>
    );
  };

  onSelectedValue = item => {
    const { callback } = this.props;
    const selectedValue = item.value.includes('new') ? item.label : item.value;
    if (selectedValue !== '') {
      this.setState({ selectedValue, item });
      callback({
        value: selectedValue,
        isNew: item.value.includes('new')
      });
    }
  };

  render() {
    const { selectedValue, values } = this.state;
    const { constantName, isForSentence } = this.props;

    return (
      <Container>
        {this.renderValueHeader()}
        <PickerWrapper>
          <SwipePicker
            items={values.map(item => ({
              value: item.value,
              label: item.label
            }))}
            onChange={({ item }) => this.onSelectedValue(item)}
            defaultValue={selectedValue}
            isForSentence={isForSentence}
            itemHeight={isForSentence ? 15 : 20}
          />
          <AddNewConstant
            constantName={constantName}
            callback={this.addNewConstant}
            values={values}
          />
        </PickerWrapper>
      </Container>
    );
  }
}

export default SwipperWithPlus;
