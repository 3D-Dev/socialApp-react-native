import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'react-native-easy-grid';
import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import { SmallText, H6 } from 'elements';
import { checkDate } from 'utils/dates';

import UserAvatars from '../UserAvatars';

export const RowContainer = styled(Row)`
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 10;
  border-width: 1px;
  padding-vertical: 10px;
  padding-horizontal: ${({ isAdding }) => (isAdding ? '12px' : '5px')};
  margin-bottom: 10px;
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`}
  flex-direction: row;
`;

export const AddContainer = styled(TouchableOpacity)`
  width: 100%;
`;

export const ColVerticalCentered = styled(Col)`
  padding-horizontal: 1px;
  justify-content: center;
  align-items: ${({ isAdding }) => (isAdding ? 'flex-start' : 'center')};
  flex: 1;
`;

export const ImageCol = styled.View`
  justify-content: center;
  align-items: center;
  width: ${({ size }) => `${size}`};
`;

const EditPlusButton = styled.TouchableOpacity`
  padding: 8px 20px;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 10;
  border-width: ${({ isAdding }) => (isAdding ? '1px' : '0px')};
`;

class TrustNetworkBox extends Component {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    isAdding: PropTypes.bool,
    callback: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    isAdding: false,
    callback: () => {}
  };

  render() {
    const { data, isAdding, callback } = this.props;
    const { currentTheme, formatMessage } = this.context;

    const count =
      data.members.length === 0
        ? formatMessage('trust.network.onlyyou')
        : `${data.members.length} ${formatMessage('trust.network.members')}`;

    return (
      <RowContainer theme={currentTheme} isAdding={isAdding}>
        <ImageCol size={70}>
          <UserAvatars members={data.members} />
        </ImageCol>

        <ColVerticalCentered isAdding={isAdding}>
          <H6 mb={0}>{data.name}</H6>
          <SmallText mb={0}>{count}</SmallText>
        </ColVerticalCentered>
        {!isAdding && (
          <ColVerticalCentered>
            <SmallText mb={0}>{checkDate(new Date(data.updated))}</SmallText>
          </ColVerticalCentered>
        )}

        <ImageCol size={isAdding ? 100 : 70}>
          <EditPlusButton
            isAdding={isAdding}
            onPress={() => {
              if (isAdding) {
                callback(data);
              } else {
                Actions['feed.network.edit']({
                  network: data,
                  callback
                });
              }
            }}
          >
            {isAdding ? (
              <H6 mb={0}>{formatMessage('add.addButton')}</H6>
            ) : (
              <Feather
                name="edit"
                size={20}
                color={currentTheme.COLORS.BORDER}
              />
            )}
          </EditPlusButton>
        </ImageCol>
      </RowContainer>
    );
  }
}

export default TrustNetworkBox;
