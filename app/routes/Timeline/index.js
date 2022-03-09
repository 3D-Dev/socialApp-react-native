import React from 'react';
import PropTypes from 'prop-types';

import { App } from 'components';
import { Section, HeaderTitle, HeaderRight, H4 } from 'elements';

const Timeline = ({}, { formatMessage }) => (
  <App>
    <HeaderTitle>{formatMessage('timeline.headerTitle')}</HeaderTitle>
    <HeaderRight />
    <Section align="center">
      <H4 mt={40}>{formatMessage('underdevelopment')}</H4>
    </Section>
  </App>
);

Timeline.contextTypes = {
  formatMessage: PropTypes.func
};

export default Timeline;
