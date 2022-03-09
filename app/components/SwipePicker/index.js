import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { noop } from 'lodash';

import ListWrapper from './ListWrapper';
import ListItemWrapper from './ListItemWrapper';
import ListItem from './ListItem';
import Overlay from './Overlay';

class SwipePicker extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    ),
    onChange: PropTypes.func,
    itemHeight: PropTypes.number,
    itemsInView: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isForSentence: PropTypes.bool
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    items: [],
    onChange: noop,
    itemHeight: 20,
    itemsInView: 10,
    width: '100%',
    defaultValue: '',
    isForSentence: false
  };

  onItemClick = index => {
    const { onChange, items } = this.props;
    onChange({ index, item: items[index] });
  };

  render() {
    const { currentTheme } = this.context;
    const {
      items,
      itemHeight,
      itemsInView,
      width,
      isForSentence,
      defaultValue
    } = this.props;
    const height = itemsInView * itemHeight;
    const extendedItems = [
      {
        value: -11,
        label: ''
      },
      {
        value: -12,
        label: ''
      },
      ...items,
      {
        value: -21,
        label: ''
      },
      {
        value: -22,
        label: ''
      }
    ];
    const fontSize = itemHeight;

    return (
      <ListWrapper width={width} height={height}>
        <FlatList
          nestedScrollEnabled
          data={extendedItems.map(item => ({
            key: item.value.toString(),
            ...item
          }))}
          renderItem={({ item, index }) => {
            let selected = false;
            if (item.label.length > 0) {
              selected =
                defaultValue.toLowerCase() ===
                  item.label.toString().toLowerCase() ||
                defaultValue.toLowerCase() ===
                  item.value.toString().toLowerCase();
            }
            return (
              <ListItemWrapper
                onPress={() => {
                  if (item && item.value && item.label !== '') {
                    this.onItemClick(index - 2);
                  }
                }}
                height={itemHeight}
                isForSentence={isForSentence}
                bColor={selected ? currentTheme.COLORS.BORDER : 'transparent'}
              >
                <ListItem
                  fontSize={fontSize}
                  bolder={selected}
                  numberOfLines={1}
                  align="left"
                >
                  {item.label}
                </ListItem>
                <ListItem fontSize={fontSize}>{selected ? '✓' : ''}</ListItem>
              </ListItemWrapper>
            );
          }}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: index * itemHeight,
            index
          })}
          snapToInterval={itemHeight}
          ListEmptyComponent={() => (
            <ListItem fontSize={fontSize}>No Items</ListItem>
          )}
        />
        <Overlay
          colors={[currentTheme.COLORS.PRIMARY_BG, 'transparent']}
          height={itemHeight * 3}
          type="top"
          pointerEvents="none"
        />
        <Overlay
          colors={['transparent', currentTheme.COLORS.PRIMARY_BG]}
          height={itemHeight * 3}
          type="bottom"
          pointerEvents="none"
        />
      </ListWrapper>
    );
  }
}

export default SwipePicker;
