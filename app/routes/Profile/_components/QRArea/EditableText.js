import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop, capitalize } from 'lodash';
import { View, Alert } from 'react-native';

import { Text, TextInput } from 'elements';

const Body = styled.TouchableOpacity`
  width: 100%;
`;

class EditableText extends Component {
  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    onUpdate: PropTypes.func,
    editable: PropTypes.bool,
    required: PropTypes.bool
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    text: '',
    editable: true,
    onUpdate: noop,
    required: false
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      edit: false
    };
  }

  render() {
    const { formatMessage } = this.context;
    const { onUpdate, editable, required, type, ...otherProps } = this.props;
    const { edit, text } = this.state;
    let displayText = '';
    if (editable) {
      displayText =
        text || formatMessage('profile.name.input.placeholder', { type });
    } else {
      displayText = text ? `${type}: ${text}` : '';
    }

    return (
      <Body onPress={() => this.setState({ edit: true })}>
        <View>
          {edit && editable ? (
            <TextInput
              clearTextOnFocus={
                text === formatMessage('profile.name.input.requiredText')
              }
              value={text}
              onChangeText={text => {
                this.setState({ text });
              }}
              onBlur={() => {
                if (required && text.length === 0) {
                  Alert.alert(
                    formatMessage('input.required.alert', {
                      type: capitalize(type)
                    })
                  );
                  this.setState({ text: otherProps.text });
                } else {
                  onUpdate(text);
                }
                this.setState({ edit: false });
              }}
            />
          ) : (
            <Text align="left">{displayText}</Text>
          )}
        </View>
      </Body>
    );
  }
}

export default EditableText;
