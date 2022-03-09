/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { H4 } from 'elements';

const RowContainer = styled(View)`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
`;

const CategoryButton = styled(TouchableOpacity)`
  flex-grow: 1;
  border: ${props => `1px solid ${props.borderColor}`};
  border-radius: 10;
  padding-top: 5px;
`;

const TopCategoryButtons = (
  { concepts, scrollTo },
  { currentTheme, formatMessage }
) => {
  const CategoryButtons = [];

  for (let i = 0; i < 7; i++) {
    if (concepts[i]) {
      const conceptKey = concepts[i].name;
      CategoryButtons.push(
        <CategoryButton
          key={i}
          onPress={() => {
            scrollTo(conceptKey);
          }}
          borderColor={currentTheme.COLORS.BORDER}
        >
          <H4 align="center" color={currentTheme.COLORS.PRIMARY}>
            {formatMessage(`concept.${conceptKey}.title`)}
          </H4>
        </CategoryButton>
      );
    }
  }

  return <RowContainer>{CategoryButtons}</RowContainer>;
};

TopCategoryButtons.propTypes = {
  concepts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  scrollTo: PropTypes.func.isRequired
};

TopCategoryButtons.contextTypes = {
  currentTheme: PropTypes.shape(),
  formatMessage: PropTypes.func
};

export default TopCategoryButtons;
