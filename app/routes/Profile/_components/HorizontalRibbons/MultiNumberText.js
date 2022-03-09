import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';

import { Text } from 'elements';

const MultiNumberText = props => {
  const { numberOfLines } = props;
  return (
    <Text
      {...props}
      ellipsizeMode="tail"
      minHeight={
        Platform.OS === 'ios' && numberOfLines ? 16 * numberOfLines : null
      }
    />
  );
};

MultiNumberText.propTypes = {
  numberOfLines: PropTypes.number.isRequired
};

export default MultiNumberText;
