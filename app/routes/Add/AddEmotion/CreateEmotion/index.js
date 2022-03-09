import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import AutoHeightImage from 'react-native-auto-height-image';
import { Actions } from 'react-native-router-flux';

import { H4, Section, TextInput, HeaderRight, AcceptButton } from 'elements';
import { Slider, App } from 'components';
import EmotionIcon from 'assets/images/add/emotion.png';
// import { AcceptButton } from 'routes/Add/_components';

const ControlsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const SliderWrapper = styled.View`
  margin-left: 10;
  flex: 1;
`;

class EmotionSection extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    onAdd: noop
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      story: '',
      value: 50,
      emotion: ''
    };
  }

  onUpdateEmotion = (index, update) => {
    const { emotions } = this.state;
    emotions[index] = {
      ...emotions[index],
      ...update
    };
    this.setState({ emotions: [...emotions] });
  };

  onSelectEmotion = () => {
    const { emotion } = this.state;
    Actions['add.emotion.picker']({
      pickedEmotion: emotion,
      onBack: pickedEmotion => this.setState({ emotion: pickedEmotion })
    });
  };

  render() {
    const { formatMessage } = this.context;
    const { value, story, emotion } = this.state;

    const tickLabels = formatMessage('add.emotion.value.tickLabels').split(',');
    const tickIndex = Math.min(
      parseInt((value / 100) * tickLabels.length, 10),
      tickLabels.length - 1
    );
    const state = tickLabels[tickIndex];
    const emotionText = emotion
      ? formatMessage(`mocha.emotion.${emotion}`).toLowerCase()
      : '...';

    return (
      <App>
        <HeaderRight>
          <AcceptButton
            type="Emotion"
            disabled={!story}
            onPress={() => {
              const { onAdd } = this.props;
              onAdd(this.state);
            }}
          />
        </HeaderRight>
        <Section align="left">
          <H4 align="left" mt={40} mb={30}>
            {formatMessage('add.emotion.full', {
              emotion: emotionText,
              state
            })}
          </H4>
          <ControlsWrapper>
            <TouchableOpacity onPress={this.onSelectEmotion}>
              <AutoHeightImage width={50} source={EmotionIcon} />
            </TouchableOpacity>
            <SliderWrapper>
              <Slider
                minimumValue={0}
                maximumValue={100}
                value={value}
                step={1}
                tickCount={tickLabels.length + 1}
                tickLabels={tickLabels}
                onSlidingComplete={value => this.setState({ value })}
              />
            </SliderWrapper>
          </ControlsWrapper>

          <H4 mt={40} mb={20}>
            {formatMessage('add.emotion.story')}
          </H4>
          <TextInput
            placeholder={formatMessage('add.emotion.story.placeholder')}
            multiline
            numberOfLines={7}
            onChangeText={story => this.setState({ story })}
            value={story}
          />
        </Section>
      </App>
    );
  }
}

export default EmotionSection;
