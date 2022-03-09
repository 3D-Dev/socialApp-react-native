import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Section, HeaderTitle, HeaderRight, HeaderButton } from 'elements';
import { App, SwipperWithPlus } from 'components';
import { Actions } from 'react-native-router-flux';

class CreateFeedback extends Component {
  static propTypes = {
    callback: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    callback: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
      isNew: false
    };
  }

  render() {
    const { formatMessage } = this.context;
    const { value, isNew } = this.state;
    const { callback } = this.props;

    return (
      <App>
        <HeaderTitle>{formatMessage('add.value.headerTitle')}</HeaderTitle>
        <HeaderRight>
          <HeaderButton
            onPress={() => {
              if (value) {
                const feedback = isNew
                  ? formatMessage('mocha.feedback', { feedback: value })
                  : formatMessage(`mocha.feedback.${value}`);
                callback(feedback, isNew);
                Actions.pop();
              }
            }}
          >
            {formatMessage('add.addButton')}
          </HeaderButton>
        </HeaderRight>

        <Section align="left">
          <SwipperWithPlus
            constantName="feedback"
            defaultValue={value}
            callback={({ value, isNew }) => {
              this.setState({ value, isNew });
            }}
            isForSentence
          />
        </Section>
      </App>
    );
  }
}

export default CreateFeedback;
