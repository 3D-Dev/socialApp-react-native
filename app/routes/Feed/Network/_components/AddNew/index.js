import React from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

import { H6 } from 'elements';

import UserAvatars from '../UserAvatars';
import {
  RowContainer,
  ColVerticalCentered,
  ImageCol,
  AddContainer
} from '../TrustNetworkBox';

const AddNew = ({ onPress, isAdding }, { currentTheme, formatMessage }) => (
  <AddContainer onPress={onPress}>
    <RowContainer theme={currentTheme} marginTop={30} isAdding={isAdding}>
      <ImageCol size={70}>
        <UserAvatars />
      </ImageCol>

      <ColVerticalCentered isAdding={isAdding}>
        <H6 mb={0}>{formatMessage('trust.network.members.add.new')}</H6>
      </ColVerticalCentered>
      <ImageCol size={isAdding ? 100 : 70}>
        <Feather name="plus" size={20} color={currentTheme.COLORS.BORDER} />
      </ImageCol>
    </RowContainer>
  </AddContainer>
);

AddNew.propTypes = {
  onPress: PropTypes.func.isRequired,
  isAdding: PropTypes.bool
};

AddNew.contextTypes = {
  formatMessage: PropTypes.func,
  currentTheme: PropTypes.shape()
};

AddNew.defaultProps = {
  isAdding: false
};

export default AddNew;
