import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

const Item = styled(TouchableOpacity)`
  padding: 15px 10px 10px 10px;
  background-color: transparent;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-bottom-width: 0.8px;
`;

const MenuItem = ({ children, link }) => {
  return (
    <Item
      onPress={() => {
        if (link) {
          Actions[link]();
        }
      }}
    >
      {children}
    </Item>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired
};

export default MenuItem;
