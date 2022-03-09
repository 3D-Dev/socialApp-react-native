import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import AutoHeightImage from 'react-native-auto-height-image';
import { View, Dimensions } from 'react-native';

import { H5 } from 'elements';

import GamifyData from './gamifyData';

const { width } = Dimensions.get('window');

const RowContainer = styled.TouchableOpacity`
  background-color: ${props => props.bgColor};
  justify-content: center;
  border-radius: 8px;
  height: 85px;
  align-self: stretch;
  margin: 10px 10px;
  padding: 0 10px;
  padding-vertical: 0px;
  padding-left: 10px;
  padding-right: ${({ smallPaddingRight }) => (smallPaddingRight ? 5 : 10)}px;
  position: relative;
`;

const TextArea = styled(Col)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ImgColumn = styled(Col)`
  position: relative;
  width: ${({ width }) => width};
`;

const ImageContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const ConceptBox = (
  { type, title, description, src, id, value, unit, startTime, endTime },
  { currentTheme }
) => {
  const data = value >= 0 ? `+${value} ${unit}` : `${value} ${unit}`;
  const textColor = currentTheme.COLORS.PRIMARY;

  const i = description.indexOf(title);
  const j = i + title.length;
  let str1 = '';
  let boldstr1 = '';
  let str2 = '';
  let boldstr2 = '';
  let str3 = '';

  if (i === 0) {
    boldstr1 = description.substring(0, j);
    str2 = description.substring(j + 1, description.length);
  } else {
    str1 = description.substring(0, i - 1);
    boldstr1 = description.substring(i, j);
    str2 = description.substring(j + 1, description.length);

    if (boldstr1.includes('or')) {
      str3 = str2;
      const ii = boldstr1.indexOf('or');
      str2 = 'or';
      boldstr2 = boldstr1.substring(ii + 2, boldstr1.length);
      boldstr1 = boldstr1.substring(0, ii - 1);
    }
  }

  let imageWidth = 60;
  if (title === 'Tap-to-count') {
    if (width < 380) {
      imageWidth = 43;
    } else {
      imageWidth = 50;
    }
  }

  return (
    <RowContainer
      onPress={() => {
        if (Actions[`add.${id}`]) {
          Actions[`add.${id}`]();
        } else {
          Actions['add.value']();
        }
      }}
      bgColor={currentTheme.COLORS.SECTION_BG}
      smallPaddingRight={title === 'Tap-to-count' && width < 380}
    >
      <Row width="100%" height={85}>
        <TextArea>
          <Row
            style={{ alignItems: type === 'gamify' ? 'flex-end' : 'center' }}
          >
            <H5 align="left" color={textColor}>
              {`${str1} `}
              <H5 bold color={textColor}>
                {boldstr1}
              </H5>
              {` ${str2} `}
              <H5 bold color={textColor}>
                {boldstr2}
              </H5>
              {` ${str3}`}
            </H5>
          </Row>

          {type === 'gamify' && (
            <GamifyData
              value={data}
              startTime={startTime}
              endTime={endTime}
              color={textColor}
            />
          )}
        </TextArea>
        <ImgColumn width={imageWidth}>
          <ImageContainer>
            <AutoHeightImage width={imageWidth} source={src} />
          </ImageContainer>
        </ImgColumn>
      </Row>
    </RowContainer>
  );
};

ConceptBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired
};

ConceptBox.contextTypes = {
  currentTheme: PropTypes.shape({
    COLORS: PropTypes.shape({
      PRIMARY: PropTypes.string
    })
  })
};

export default ConceptBox;
