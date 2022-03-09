import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import { noop } from 'lodash';

class CollapseButton extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onUpdate: PropTypes.func,
    size: PropTypes.number
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    isOpen: false,
    onUpdate: noop,
    size: 35
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
  }

  render() {
    const { onUpdate, size } = this.props;
    const { isOpen } = this.state;
    const { currentTheme } = this.context;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ isOpen: !isOpen });
          onUpdate(isOpen);
        }}
      >
        <AntDesign
          name={isOpen ? 'up' : 'down'}
          size={size}
          color={currentTheme.COLORS.PRIMARY}
        />
      </TouchableOpacity>
    );
  }
}

export default CollapseButton;
