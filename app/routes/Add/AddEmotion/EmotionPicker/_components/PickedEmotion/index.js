import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

import { H2 } from 'elements';
import { getSelector } from 'redux/selectors';

const PickedEmotion = ({ pickedEmotion }, { formatMessage }) => (
  <H2 mt={30} mb={10}>
    {pickedEmotion
      ? formatMessage(`mocha.emotion.${pickedEmotion}`)
      : formatMessage('add.emotion.picker.guide')}
  </H2>
);

PickedEmotion.contextTypes = {
  formatMessage: PropTypes.func
};

PickedEmotion.propTypes = {
  pickedEmotion: PropTypes.string
};

PickedEmotion.defaultProps = {
  pickedEmotion: ''
};

const mapStateToProps = state => ({
  pickedEmotion: getSelector('data', 'pickedEmotion')(state)
});

export default compose(
  setDisplayName('PickedEmotion'),
  connect(mapStateToProps)
)(PickedEmotion);
