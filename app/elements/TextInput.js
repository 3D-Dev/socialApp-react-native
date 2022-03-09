import React, { Component } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import { fontFamilies, fontSizes } from 'constants/fonts';

const TextInputElement = styled(RNTextInput)`
  font-family: ${props => {
    if (props.bolder) {
      return fontFamilies.Bolder;
    }
    if (props.bold) {
      return fontFamilies.Bold;
    }
    if (props.semiBold) {
      return fontFamilies.SemiBold;
    }
    return fontFamilies.Regular;
  }};

  font-size: ${({ fontSize }) => fontSize};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  text-align: ${({ align }) => align};

  padding-horizontal: 10;
  padding-vertical: 10;
  ${({ underline, theme }) =>
    underline &&
    `
    text-decoration: underline;
    text-decoration-color: ${theme.COLORS.PRIMARY}
  `};

  background-color: ${({ background }) => background};

  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5;
  align-self: stretch;
  text-align: left;
  font-style: normal;
  ${({ empty }) =>
    empty &&
    `
    opacity: 0.5;
    font-style: italic;
  `}
`;

class TextInput extends Component {
  static propTypes = {
    bolder: PropTypes.bool,
    bold: PropTypes.bool,
    semiBold: PropTypes.bool,
    fontSize: PropTypes.number,
    align: PropTypes.string,
    underline: PropTypes.bool,
    background: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    bolder: false,
    bold: false,
    semiBold: false,
    fontSize: fontSizes.normal,
    align: 'center',
    underline: false,
    background: 'transparent',
    value: '',
    onChange: noop,
    onChangeText: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      empty: !(props.value && props.value.length),
      value: props.value
    };
  }

  handleChange = ev => {
    const { onChange, onChangeText } = this.props;
    const empty = !ev.nativeEvent.text.length;
    this.setState({ empty, value: ev.nativeEvent.text });
    if (onChange) onChange(ev);
    if (onChangeText) onChangeText(ev.nativeEvent.text);
  };

  render() {
    const { currentTheme } = this.context;
    const { onChange, ...rest } = this.props;
    const { empty, value } = this.state;
    return (
      <TextInputElement
        onChange={this.handleChange}
        placeholderTextColor={currentTheme.COLORS.PRIMARY}
        {...rest}
        empty={empty}
        value={value}
      />
    );
  }
}

export default TextInput;
