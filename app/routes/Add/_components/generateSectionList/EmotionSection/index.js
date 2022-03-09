import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { H4, TextInput } from 'elements';
import { Slider } from 'components';
import EmotionIcon from 'assets/images/add/emotion.png';

import CollapseWithTrash from '../CollapseWithTrash';

const Container = styled.View`
  border-radius: 5;
  margin: 15px;
  border: ${({ theme }) => theme.COLORS.BORDER};
  padding: 15px;
  text-align: left;
`;

const TextAndRoll = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 10;
`;

const SliderWrapper = styled.View`
  width: 100%;
  position: relative;
  height: 80;
`;

class EmotionSection extends Component {
  static propTypes = {
    data: PropTypes.shape(),
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    data: {},
    onUpdate: () => {},
    onDelete: () => {}
  };

  onSelectEmotion = () => {
    const { onUpdate, data } = this.props;
    Actions['add.emotion.picker']({
      pickedEmotion: data.emotion,
      onBack: pickedEmotion => onUpdate({ emotion: pickedEmotion })
    });
  };

  render() {
    const { data, onUpdate, onDelete } = this.props;
    const { formatMessage } = this.context;

    const tickLabels = formatMessage('add.emotion.value.tickLabels').split(',');
    const tickIndex = Math.min(
      parseInt((data.value / 100) * tickLabels.length, 10),
      tickLabels.length - 1
    );
    const state = tickLabels[tickIndex];
    const emotion = data.emotion
      ? formatMessage(`mocha.emotion.${data.emotion}`).toLowerCase()
      : '...';

    const TextContent = (
      <H4 align="left" padding="10px 5px 5px 0">
        {formatMessage('add.emotion.full', {
          emotion,
          state
        })}
      </H4>
    );

    if (data.minimized) {
      return (
        <Container>
          <CollapseWithTrash
            isOpen={!data.minimized}
            collapseUpdated={() => {
              onUpdate({ minimized: !data.minimized });
            }}
            onDelete={onDelete}
          />
          <TouchableOpacity
            onPress={() => {
              onUpdate({ minimized: !data.minimized });
            }}
          >
            {TextContent}
          </TouchableOpacity>
        </Container>
      );
    }
    return (
      <Container>
        <CollapseWithTrash
          isOpen={!data.minimized}
          collapseUpdated={() => {
            onUpdate({ minimized: !data.minimized });
          }}
          onDelete={onDelete}
        />

        <TextAndRoll>
          {TextContent}
          <TouchableOpacity onPress={this.onSelectEmotion}>
            <AutoHeightImage width={35} source={EmotionIcon} />
          </TouchableOpacity>
        </TextAndRoll>

        <SliderWrapper>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={data.value}
            step={1}
            tickCount={tickLabels.length + 1}
            tickLabels={tickLabels}
            onSlidingComplete={value => onUpdate({ value })}
          />
        </SliderWrapper>

        <H4 align="left" mt={30} mb={15}>
          {formatMessage('add.emotion.story')}
        </H4>
        <TextInput
          placeholder={formatMessage('add.emotion.story.placeholder')}
          multiline
          numberOfLines={7}
          onEndEditing={({ nativeEvent: { text: story } }) =>
            onUpdate({ story })
          }
          value={data.story}
        />
      </Container>
    );
  }
}

export default EmotionSection;
