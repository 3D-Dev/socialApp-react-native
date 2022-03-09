import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import MultiToggleSwitchItem from './MultiToggleSwitchItem';

export default class MultiToggleSwitch extends Component {
  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIdx: props.defaultActiveIndex
    };
  }

  setActiveIndex = idx => {
    this.setState({ activeIdx: idx });
  };

  renderToggleItems = () => {
    const { children, itemsContainer } = this.props;
    const { activeIdx } = this.state;
    const toggleButtons = !Array.isArray(children) ? [children] : children;

    return (
      <View style={itemsContainer} pointerEvents="box-none">
        {toggleButtons.map((MultiToggleSwitch, idx) => (
          <MultiToggleSwitchItem
            key={idx}
            {...this.props}
            {...MultiToggleSwitch.props}
            active={idx === activeIdx}
            onPress={() => {
              this.setActiveIndex(idx);
              MultiToggleSwitch.props.onPress();
            }}
          />
        ))}
      </View>
    );
  };

  render() {
    const { itemsContainerBackgroundStyle, children } = this.props;
    const cnt = children.length;
    const { currentTheme } = this.context;

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: currentTheme.COLORS.BORDER,
          marginTop: 10,
          width: '100%',
          position: 'relative',
          height: 70
        }}
      >
        <View style={[itemsContainerBackgroundStyle, { width: 80 * cnt }]} />
        {this.renderToggleItems()}
      </View>
    );
  }
}

MultiToggleSwitch.Item = MultiToggleSwitchItem;

MultiToggleSwitch.defaultProps = {
  defaultActiveIndex: 0,
  itemsContainer: {
    flexDirection: 'row',
    height: 70,
    position: 'relative'
  },
  itemsContainerBackgroundStyle: {
    position: 'absolute',
    height: 70,
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  onPress: () => {}
};

MultiToggleSwitch.propTypes = {
  defaultActiveIndex: PropTypes.number,

  itemsContainer: ViewPropTypes.style,
  itemsContainerBackgroundStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired
};
