import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ImageWithLoading, H5, Section } from 'elements';
import { DisplayModal } from 'components';

import MultiNumberText from './MultiNumberText';
import { Item, CardImageWrapper, DialogImageWrapper } from './Value';

class Card extends Component {
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      vulnerability: PropTypes.number,
      image: PropTypes.string
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

    let tags = '';
    content.tags.forEach(item => {
      tags = `${tags} ${item}# `;
    });

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
                {formatMessage('modal.usermanual.header', {
                  title: content.title
                })}
              </H5>

              <DialogImageWrapper>
                <ImageWithLoading
                  image={content.image}
                  width={170}
                  height={170}
                />
              </DialogImageWrapper>

              <H5 align="left" mt={20}>
                {content.text}
              </H5>

              <H5 align="left" mt={20}>
                <H5 align="left" bold>
                  {`${formatMessage('trustnetwork.tags.title')}:`}
                </H5>
                {tags}
              </H5>
              <H5 align="left" bold>
                <H5 align="left" bold>
                  {`${formatMessage('trustnetwork.vulnerability.title')}:`}
                </H5>
                {content.vulnerability}
              </H5>
            </ScrollView>
          </Section>
        </DisplayModal>

        <View>
          <CardImageWrapper>
            <ImageWithLoading image={content.image} width={60} height={60} />
          </CardImageWrapper>

          <MultiNumberText align="center" mt={0} numberOfLines={1}>
            {content.title}
          </MultiNumberText>

          <MultiNumberText mb={0} mt={10} align="left" numberOfLines={5}>
            {content.text}
          </MultiNumberText>
        </View>
      </Item>
    );
  }
}

export default Card;
