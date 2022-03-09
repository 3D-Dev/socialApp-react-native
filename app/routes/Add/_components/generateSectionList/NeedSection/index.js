import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { H4, TextInput } from 'elements';
import { Slider, SwipperWithPlus } from 'components';

import CollapseWithTrash from '../CollapseWithTrash';

const Container = styled.View`
  border-radius: 5;
  margin: 15px;
  border: ${({ theme }) => theme.COLORS.BORDER};
  padding: 15px;
  text-align: left;
`;

class NeedSection extends Component {
  static propTypes = {
    data: PropTypes.shape(),
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    constantData: PropTypes.shape()
  };

  static defaultProps = {
    data: {},
    onUpdate: () => {},
    onDelete: () => {}
  };

  state = { minimized: false };

  render() {
    const { data, onUpdate, onDelete } = this.props;
    const { formatMessage } = this.context;
    const { minimized } = this.state;

    const tickLabels = formatMessage('add.need.value.tickLabels').split(',');
    const tickIndex = Math.min(
      parseInt((data.value / 100) * tickLabels.length, 10),
      tickLabels.length - 1
    );
    const state = tickLabels[tickIndex];
    const need = data.need
      ? formatMessage(`mocha.need.${data.need}`).toLowerCase()
      : '...';
    if (minimized) {
      return (
        <Container>
          <CollapseWithTrash
            isOpen={!minimized}
            collapseUpdated={() => {
              this.setState({ minimized: !minimized });
            }}
            onDelete={onDelete}
          />
          <TouchableOpacity
            onPress={() => this.setState({ minimized: !minimized })}
          >
            <H4 align="left" padding="10px 0 5px 0">
              {formatMessage('add.need.full', {
                need,
                state,
                reason: data.reason
              })}
            </H4>
          </TouchableOpacity>
        </Container>
      );
    }
    return (
      <Container>
        <CollapseWithTrash
          isOpen={!minimized}
          collapseUpdated={() => {
            this.setState({ minimized: !minimized });
          }}
          onDelete={onDelete}
        />
        <View style={{ height: 250 }}>
          <SwipperWithPlus
            constantName="need"
            defaultValue={data.need}
            callback={({ value }) => {
              onUpdate({ need: value });
            }}
          />
        </View>

        <H4 align="left" mt={25} mb={5}>
          {formatMessage('add.need.is', { state })}
        </H4>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={data.value}
          step={1}
          tickCount={tickLabels.length + 1}
          tickLabels={tickLabels}
          onSlidingComplete={value => onUpdate({ value })}
        />
        <H4 align="left" mt={25} mb={5}>
          {formatMessage('add.need.reason')}
        </H4>
        <TextInput
          placeholder={formatMessage('add.need.reason.placeholder')}
          multiline
          numberOfLines={2}
          onEndEditing={({ nativeEvent: { text: reason } }) =>
            onUpdate({ reason })
          }
          value={data.reason}
        />
      </Container>
    );
  }
}

export default NeedSection;
