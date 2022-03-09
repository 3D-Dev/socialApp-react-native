import React from 'react';
import { ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const MultiToggleSwitchItem = (props, { currentTheme }) => {
  const { itemContainer, active, children } = props;

  const primaryColor = currentTheme.COLORS.PRIMARY;
  const secondaryColor = currentTheme.COLORS.PRIMARY_BG;

  return (
    <TouchableOpacity
      style={[
        itemContainer,
        active === true
          ? {
              height: 70,
              width: '25%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: currentTheme.COLORS.BORDER,
              elevation: 7,
              shadowOpacity: 0.0015 * 7 + 0.18,
              shadowRadius: 0.54 * 7,
              shadowOffset: {
                height: 0.6 * 7
              }
            }
          : undefined,
        active === true ? { backgroundColor: primaryColor } : undefined
      ]}
      onPress={() => props.onPress()}
    >
      {React.cloneElement(children, {
        color: active ? secondaryColor : primaryColor
      })}
    </TouchableOpacity>
  );
};

MultiToggleSwitchItem.defaultProps = {
  active: false,
  onPress: () => {},
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    height: 70,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
};

MultiToggleSwitchItem.contextTypes = {
  currentTheme: PropTypes.shape()
};

MultiToggleSwitchItem.propTypes = {
  active: PropTypes.bool,
  itemContainer: ViewPropTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default MultiToggleSwitchItem;
