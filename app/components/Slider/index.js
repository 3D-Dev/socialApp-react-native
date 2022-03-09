import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RNSlider from 'react-native-slider';
import styled from 'styled-components';

import { TinyText } from 'elements';

const SliderWrapper = styled.View`
  padding-horizontal: 10;
  height: ${({ size }) => size};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: ${({ size }) => size / 7};
  width: 100%;
  align-items: stretch;
  justify-content: center;
  margin-top: ${({ mt }) => mt};
`;

const TickWrapper = styled.View`
  position: absolute;
  left: ${({ gap }) => gap + 10};
  right: ${({ gap }) => gap + 10};
  height: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const Tick = styled.View`
  position: absolute;
  left: ${({ position }) => position}%;
  width: 3;
  top: 25%;
  height: 50%;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

const Track = styled.View`
  position: absolute;
  top: 50%;
  height: 3;
  width: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

const TickLabel = styled(TinyText)`
  flex: 1;
`;

class Slider extends Component {
  static propTypes = {
    mt: PropTypes.number,
    size: PropTypes.number,
    tickCount: PropTypes.number,
    tickLabels: PropTypes.arrayOf(PropTypes.string)
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    size: 70,
    mt: 0,
    tickCount: 0,
    tickLabels: []
  };

  render() {
    const { currentTheme } = this.context;
    const { size, tickCount, mt, tickLabels, ...rest } = this.props;
    const styles = {
      thumbTouchSize: { width: size, height: size },
      thumbStyle: { height: (size * 5) / 7, width: (size * 2) / 7 }
    };
    return (
      <SliderWrapper size={size} mt={mt}>
        <TickWrapper gap={size / 7}>
          <Track />
          {new Array(tickCount).fill(0).map((tick, index) => (
            <Tick position={(index / (tickCount - 1)) * 100} key={index} />
          ))}
          {tickLabels.map((tickLabel, index) => (
            <TickLabel key={index} gap={size / 7}>
              {tickLabel}
            </TickLabel>
          ))}
        </TickWrapper>
        <RNSlider
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor={currentTheme.COLORS.PRIMARY}
          thumbTouchSize={styles.thumbTouchSize}
          thumbStyle={styles.thumbStyle}
          {...rest}
        />
      </SliderWrapper>
    );
  }
}

export default Slider;
