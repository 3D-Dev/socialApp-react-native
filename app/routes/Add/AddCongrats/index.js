import React from 'react';
import PropTypes from 'prop-types';

import { Actions } from 'react-native-router-flux';

import { H3, RoundButton, H4 } from 'elements';
import { App } from 'components';

import { Container, VerticalCentered } from '../../Welcome/_components/layout';

const AddCongrats = ({ addType }, { formatMessage }) => (
  <App hasHeader={false}>
    <Container style={{ marginTop: 0, marginBottom: 100 }}>
      <VerticalCentered>
        <H3>
          {formatMessage('add.congrats.text', {
            type: addType === 'Manual' ? 'User Manual Entry' : addType
          })}
        </H3>
        <RoundButton
          onPress={() => {
            Actions.reset('add');
            if (addType === 'Feedback') {
              Actions.feedback();
            } else {
              Actions[`add.${addType.toLowerCase()}`]();
            }
          }}
        >
          <H4>
            {formatMessage('add.back.to.reflection.list', {
              reflection: formatMessage(addType)
            })}
          </H4>
        </RoundButton>
      </VerticalCentered>
    </Container>
  </App>
);

AddCongrats.contextTypes = {
  formatMessage: PropTypes.func
};

AddCongrats.propTypes = {
  addType: PropTypes.string
};

AddCongrats.defaultProps = {
  addType: 'Value'
};

export default AddCongrats;
