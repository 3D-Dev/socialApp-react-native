import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { EvilIcons, AntDesign } from '@expo/vector-icons';

const ActionsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

class CollapseWithTrash extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onDelete: PropTypes.func,
    collapseUpdated: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    isOpen: false,
    onDelete: () => {},
    collapseUpdated: () => {}
  };

  render() {
    const { isOpen, collapseUpdated, onDelete } = this.props;
    const { currentTheme } = this.context;

    return (
      <ActionsWrapper>
        <TouchableOpacity
          onPress={() => {
            collapseUpdated();
          }}
        >
          <AntDesign
            name={isOpen ? 'up' : 'down'}
            size={25}
            color={currentTheme.COLORS.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <EvilIcons
            name="trash"
            size={30}
            color={currentTheme.COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </ActionsWrapper>
    );
  }
}

export default CollapseWithTrash;
