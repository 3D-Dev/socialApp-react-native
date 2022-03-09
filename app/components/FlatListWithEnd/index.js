import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';

const LastElementHash = { hash: 'XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT' };

// Just a place holder element
const DefaultRenderEndComponent = () => {
  return (
    <View style={{ paddingVertical: 15 }}>
      <Text style={{ textAlign: 'center' }}>End of list</Text>
    </View>
  );
};

const FlatListWithEnd = props => {
  const { data, hasEnd } = props;
  const mutatedProps = {
    ...props
  };

  if (hasEnd) {
    // from right to left
    const originalData = data && data.length > 0 && data.slice(0);
    const newData = [LastElementHash].concat(originalData);

    /**
     * A new renderItem function to replace the default
     * Basically, we check if the item is the last element we manually pushed in earlier
     * If so, we render the EndComponent
     *
     * @param {any}        {item} Same as from FlatList
     * @returns {Function} A function which returns a React Component.
     */
    const renderItem = ({ item }) => {
      if (item && item.hash === LastElementHash.hash) {
        return props.renderEndComponent();
      }
      return props.renderItem({ item });
    };

    mutatedProps.data = newData;
    mutatedProps.renderItem = renderItem;

    return <FlatList {...mutatedProps} />;
  }

  return <FlatList {...mutatedProps} />;
};

FlatListWithEnd.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  hasEnd: PropTypes.bool,
  fromLast: PropTypes.bool,
  renderItem: PropTypes.func.isRequired,
  renderEndComponent: PropTypes.func
};

FlatListWithEnd.defaultProps = {
  renderEndComponent: DefaultRenderEndComponent,
  hasEnd: false,
  fromLast: true
};

export default FlatListWithEnd;
