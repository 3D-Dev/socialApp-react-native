import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H6 } from 'elements';

const Item = styled.View`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 40;
  position: relative;
  padding: 10px 20px;
  margin: 10px;
  height: 60px;
`;

const Date = styled.Text`
  position: absolute;
  right: 20;
  bottom: 5;
`;

const Activity = ({ item }, { formatMessage }) => {
  const { title, data, lastactivity } = item;
  const name = (data && data.user && data.user.name) || '';
  const titleString = formatMessage(title, { name });
  return (
    <Item>
      <H6 align="left">{titleString}</H6>
      <Date>
        <H6 italic>{formatMessage(`date.${lastactivity}`)}</H6>
      </Date>
    </Item>
  );
};

Activity.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    lastactivity: PropTypes.string.isRequired,
    data: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
};

Activity.contextTypes = {
  formatMessage: PropTypes.func
};

export default Activity;
