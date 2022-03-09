import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { TouchableOpacity } from 'react-native';

import { H5, TextInput } from 'elements';

class SubTextArea extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    onUpdate: PropTypes.func,
    mb: PropTypes.number
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    value: 'action value',
    name: 'action',
    onUpdate: noop,
    mb: 0
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    const { formatMessage } = this.context;
    const { onUpdate, name, mb } = this.props;
    const { edit, value } = this.state;

    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          marginBottom: mb,
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
        onPress={() => {
          this.setState({ edit: !edit });
        }}
      >
        {edit ? (
          <TextInput
            value={value}
            multiline
            placeholder={formatMessage('add.value.placeholderText', {
              type: name
            })}
            onChangeText={value => {
              this.setState({ value });
            }}
            autoFocus
            onBlur={() => {
              this.setState({ edit: false });
              onUpdate(value);
            }}
          />
        ) : (
          <H5>
            {value ||
              formatMessage('add.value.placeholderText', { type: name })}
          </H5>
        )}
      </TouchableOpacity>
    );
  }
}

export default SubTextArea;
