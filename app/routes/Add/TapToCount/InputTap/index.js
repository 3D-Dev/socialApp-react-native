import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { noop } from 'lodash';

import { H2, H4, RoundButton, Section, TextInput } from 'elements';
import { App } from 'components';

class InputTap extends Component {
  static propTypes = {
    onAddTap: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    onAddTap: noop
  };

  state = { text: '' };

  render() {
    const { formatMessage } = this.context;
    const { onAddTap } = this.props;
    const { text } = this.state;
    return (
      <App>
        <Section>
          <H2 mt={30} bold>
            {formatMessage('add.tap.heading')}
          </H2>
        </Section>
        <Section align="left">
          <H4 align="left">{formatMessage('add.tap.input.follower')}</H4>
        </Section>
        <Section>
          <TextInput
            placeholder={formatMessage('add.tap.input.placeholder')}
            onChangeText={text => {
              this.setState({ text });
            }}
            value={text}
          />
        </Section>
        <Section align="center">
          <RoundButton
            onPress={() => {
              onAddTap({ text });
              Actions.pop();
            }}
            disabled={!text}
            isFullWidth
          >
            <H4>{formatMessage('done')}</H4>
          </RoundButton>
        </Section>
      </App>
    );
  }
}

export default InputTap;
