import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ImageWithLoading, H5, Section } from 'elements';
import { DisplayModal } from 'components';

import MultiNumberText from './MultiNumberText';

export const Item = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8;
  padding: 15px;
  margin-vertical: 0px;
  width: 200px;
  height: 260px;
  margin: 0 10px;
`;

export const DialogImageWrapper = styled.View`
  width: 170px;
  height: 170px;
  margin: 0 auto;
`;

export const CardImageWrapper = styled.View`
  width: 60px;
  height: 60px;
  margin: 0 auto 5px auto;
`;

class Card extends Component {
  static propTypes = {
    content: PropTypes.shape({
      value: PropTypes.string,
      phrase: PropTypes.string,
      action: PropTypes.string,
      image: PropTypes.string,
      learn: PropTypes.string
    }).isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  ModalStateChange = () => {
    const { modalOpened } = this.state;
    this.setState({ modalOpened: !modalOpened });
  };

  render() {
    const { modalOpened } = this.state;
    const { formatMessage } = this.context;
    const { content } = this.props;

    return (
      <Item onPress={this.ModalStateChange} modalOpened={modalOpened}>
        <DisplayModal modalVisible={modalOpened}>
          <Section>
            <TouchableOpacity
              onPress={this.ModalStateChange}
              style={{ position: 'absolute', right: 10, top: -10 }}
            >
              <H5>
                <MaterialCommunityIcons name="window-close" size={25} />
              </H5>
            </TouchableOpacity>

            <ScrollView style={{ width: '100%' }}>
              <H5 mb={20} bold align="center">
                {formatMessage('modal.value.header', { title: content.value })}
              </H5>
              <DialogImageWrapper>
                <ImageWithLoading
                  image={content.image}
                  width={170}
                  height={170}
                />
              </DialogImageWrapper>

              <H5 bold align="left" mt={20}>
                {formatMessage('add.value.phrase')}
              </H5>
              <H5 align="left">{content.phrase}</H5>
              <H5 bold align="left" mt={20}>
                {formatMessage('add.value.action')}
              </H5>
              <H5 align="left">{content.action}</H5>
              <H5 bold align="left" mt={20}>
                {formatMessage('add.value.learn')}
              </H5>
              <H5 align="left">{content.learn}</H5>
            </ScrollView>
          </Section>
        </DisplayModal>

        <View>
          <H5>{content.value || ''}</H5>
          <CardImageWrapper>
            <ImageWithLoading image={content.image} width={60} height={60} />
          </CardImageWrapper>
          <MultiNumberText align="center" mt={0} numberOfLines={1}>
            {content.phrase}
          </MultiNumberText>

          <MultiNumberText mb={0} mt={10} align="left" numberOfLines={5}>
            {content.action}
          </MultiNumberText>
        </View>
      </Item>
    );
  }
}

export default Card;
