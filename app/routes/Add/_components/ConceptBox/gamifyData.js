import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from 'react-native-easy-grid';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { H5 } from 'elements';

const DataRow = styled(Row)`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex: 1;
  width: 100%;
`;

const Title = styled(H5)`
  margin-left: 5px;
  margin-bottom: 0px;
`;

const GamifyData = ({ value, startTime, endTime, color }) => {
  let period = `${startTime}`;
  if (startTime < 1) {
    period = '<1';
  } else if (endTime > startTime && endTime !== '') {
    period = period.concat(`-${endTime}`);
  }

  period = period.concat(' min');

  return (
    <DataRow>
      <DataRow>
        <MaterialCommunityIcons
          name="star-four-points-outline"
          size={20}
          color={color}
        />

        <Title align="left" color={color}>
          {value}
        </Title>
      </DataRow>
      <DataRow>
        <FontAwesome name="clock-o" size={20} color={color} />
        <Title align="left" color={color}>
          {period}
        </Title>
      </DataRow>
    </DataRow>
  );
};

GamifyData.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired
};

export default GamifyData;
