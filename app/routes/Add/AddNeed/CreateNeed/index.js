import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { App, Slider, SwipperWithPlus } from 'components';
import {
  H4,
  Section,
  HeaderTitle,
  HeaderRight,
  TextInput,
  AcceptButton
} from 'elements';

class CreateNeed extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    onAdd: noop
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      need: '',
      reason: '',
      value: 50
    };
  }

  render() {
    const {} = this.props;
    const { formatMessage } = this.context;
    const { value, need, reason } = this.state;

    const tickLabels = formatMessage('add.need.value.tickLabels').split(',');
    const tickIndex = Math.min(
      parseInt((value / 100) * tickLabels.length, 10),
      tickLabels.length - 1
    );
    const state = tickLabels[tickIndex];

    return (
      <App>
        <HeaderTitle>{formatMessage('add.value.headerTitle')}</HeaderTitle>
        <HeaderRight>
          <AcceptButton
            type="Need"
            disabled={!reason}
            onPress={() => {
              const { onAdd } = this.props;
              onAdd(this.state);
            }}
          />
        </HeaderRight>

        <Section align="left" style={{ marginTop: 30 }}>
          <SwipperWithPlus
            constantName="need"
            defaultValue={need}
            callback={({ value }) => {
              this.setState({ need: value });
            }}
          />

          <H4 align="left" mt={25} mb={5}>
            {formatMessage('add.need.is', { state })}
          </H4>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={value}
            step={1}
            tickCount={tickLabels.length + 1}
            tickLabels={tickLabels}
            onSlidingComplete={value => {
              this.setState({ value });
            }}
          />
          <H4 align="left" mt={25} mb={5}>
            {formatMessage('add.need.reason')}
          </H4>
          <TextInput
            placeholder={formatMessage('add.need.reason.placeholder')}
            multiline
            numberOfLines={2}
            onChangeText={reason => {
              this.setState({ reason });
            }}
            value={reason}
          />
        </Section>
      </App>
    );
  }
}

export default CreateNeed;
