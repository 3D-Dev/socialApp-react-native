import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { FeedbackBox, SceneContainer } from '../_components';

const Received = ({ received }) => (
  <SceneContainer>
    {received &&
      received.length > 0 &&
      received.map(item => {
        return (
          <FeedbackBox
            key={uuid.v4()}
            name={item.name}
            avatar={item.avatar || ''}
            feedback={item.feedback}
            question={item.question}
          />
        );
      })}
  </SceneContainer>
);

Received.propTypes = {
  received: PropTypes.arrayOf(PropTypes.shape({}))
};

Received.defaultProps = {
  received: []
};

export default Received;
