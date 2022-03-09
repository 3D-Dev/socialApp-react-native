import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { capitalize, noop } from 'lodash';

import { EMOTIONS } from 'constants/mocha';
import { Section, HeaderTitle, HeaderRight } from 'elements';
import { App, RouletteChart } from 'components';
import { pickEmotion } from 'redux/data/actions';
import { hslToRgb } from 'utils/colorConversion';

import { PickedEmotion } from './_components';

class EmotionPicker extends Component {
  static propTypes = {
    pickedEmotion: PropTypes.string,
    onBack: PropTypes.func,
    pickEmotion: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    pickedEmotion: '',
    onBack: noop
  };

  constructor(props) {
    super(props);
    this.currentEmotion = props.pickedEmotion;
    props.pickEmotion(this.currentEmotion);
  }

  onUpdateAngle = angle => {
    const { pickEmotion } = this.props;
    const index = parseInt(((360 - angle) / 360) * EMOTIONS[2].length, 10);
    this.currentEmotion = EMOTIONS[2][index];
    pickEmotion(this.currentEmotion);
  };

  render() {
    const { formatMessage } = this.context;
    const { onBack, pickedEmotion } = this.props;

    const innerRadiuses = [7, 36, 67];
    const lightness = [0.7, 0.75, 0.8];
    const data = EMOTIONS.map((EMOTIONSET, index) => ({
      innerRadius: innerRadiuses[index],
      items: EMOTIONSET.map((EMOTION, emotionIndex) => ({
        label: capitalize(formatMessage(`mocha.emotion.${EMOTION}`)),
        value: EMOTIONS[index + 1]
          ? EMOTIONS[index + 1].filter(item => item.startsWith(EMOTION)).length
          : 1,
        stroke: 'black',
        fill: `rgb(${hslToRgb(
          (EMOTIONSET.length - emotionIndex - 1) / EMOTIONSET.length,
          1,
          lightness[index]
        ).join(', ')})`
      }))
    }));
    return (
      <App onBack={() => onBack(this.currentEmotion)}>
        <HeaderTitle>
          {formatMessage('add.emotion.picker.headerTitle')}
        </HeaderTitle>
        <HeaderRight />
        <Section>
          <PickedEmotion />
          <RouletteChart
            data={data}
            onUpdateAngle={this.onUpdateAngle}
            initialValue={pickedEmotion}
            scalable
            rotatable
          />
        </Section>
      </App>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickEmotion: payload => dispatch(pickEmotion(payload))
});

export default compose(
  setDisplayName('EmotionPicker'),
  connect(undefined, mapDispatchToProps)
)(EmotionPicker);
