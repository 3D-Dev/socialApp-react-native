import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Row } from 'react-native-easy-grid';

import { DisplayModal } from 'components';
import { H6, Avatar, NoAvatar, H5, Section } from 'elements';

import MultiNumberText from '../HorizontalRibbons/MultiNumberText';

const RowCentered = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 70px;
`;

const Item = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8;
  padding: 15px;
  margin-vertical: 0px;
  width: 160px;
  height: 190px;
  margin: 0 10px;
`;

class Card extends Component {
  static propTypes = {
    item: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      feedback: PropTypes.string,
      question: PropTypes.string
    }).isRequired
  };

  state = {
    modalOpened: false
  };

  ModalStateChange = () => {
    const { modalOpened } = this.state;
    this.setState({ modalOpened: !modalOpened });
  };

  render() {
    const { modalOpened } = this.state;
    const { item } = this.props;
    const { feedback, name, avatar, question } = item;

    return (
      <Item onPress={this.ModalStateChange} modalOpened={modalOpened}>
        <DisplayModal modalVisible={modalOpened}>
          <Section>
            <TouchableOpacity
              onPress={this.ModalStateChange}
              style={{ position: 'absolute', right: 10, top: -10 }}
            >
              <H6>
                <MaterialCommunityIcons name="window-close" size={25} />
              </H6>
            </TouchableOpacity>

            <ScrollView style={{ width: '100%' }}>
              <RowCentered>
                {avatar && avatar !== '' ? (
                  <Avatar source={avatar} size={60} />
                ) : (
                  <NoAvatar size={60} />
                )}
              </RowCentered>
              <H6>{name || 'unnamed'}</H6>
              <H5 align="center" mt={20} numberOfLines={1}>
                {question}
              </H5>
              <H5 align="center" mt={5} numberOfLines={2}>
                {feedback}
              </H5>
            </ScrollView>
          </Section>
        </DisplayModal>

        <View>
          <RowCentered>
            {avatar && avatar !== '' ? (
              <Avatar source={avatar} size={60} />
            ) : (
              <NoAvatar size={60} />
            )}
          </RowCentered>
          <H6>{name || 'unnamed'}</H6>
          <MultiNumberText align="center" mt={0} numberOfLines={1}>
            {question}
          </MultiNumberText>
          <MultiNumberText align="center" mt={5} numberOfLines={2}>
            {feedback}
          </MultiNumberText>
        </View>
      </Item>
    );
  }
}

export default Card;
