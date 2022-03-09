import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';

const PlusIcon = ({ sectionType, onAdd }, { currentTheme }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Actions[`add.${sectionType}.create`]({
          onAdd
        });
      }}
    >
      <AntDesign name="plus" size={60} color={currentTheme.COLORS.PRIMARY} />
    </TouchableOpacity>
  );
};

PlusIcon.propTypes = {
  sectionType: PropTypes.string,
  onAdd: PropTypes.func
};

PlusIcon.contextTypes = {
  currentTheme: PropTypes.shape({
    COLORS: PropTypes.shape({
      PRIMARY: PropTypes.string
    })
  })
};

PlusIcon.defaultProps = {
  sectionType: 'value',
  onAdd: () => {}
};

export default PlusIcon;
