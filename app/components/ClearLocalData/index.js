import React from 'react';
import PropTypes from 'prop-types';
import { Button, AsyncStorage } from 'react-native';

const Clear = ({ title }) => (
  <Button
    title={`clear localstorage data of ${title}`}
    onPress={async () => {
      await AsyncStorage.removeItem(title);
    }}
  />
);

Clear.propTypes = {
  title: PropTypes.string.isRequired
};

export default Clear;
