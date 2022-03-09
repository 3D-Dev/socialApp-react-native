import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, Text, G } from 'react-native-svg';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import * as d3 from 'd3-shape';
import styled from 'styled-components';
import Animation from 'easing-animation';
import { isEqual, noop } from 'lodash';

import Slider from 'components/Slider';

const PieChartWrapper = styled.View`
  align-self: stretch;
  aspect-ratio: 1;
`;

const Panel = styled(Svg)`
  flex: 1;
  align-self: stretch;
`;

const sampleData = [
  {
    innerRadius: 10,
    items: [
      { label: 'Red', fill: 'red', stroke: 'black' },
      { label: 'Yellow', fill: 'yellow', stroke: 'black' },
      { label: 'Blue', fill: 'blue', stroke: 'black' }
    ]
  }
];

class RouletteChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        innerRadius: PropTypes.number,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            fill: PropTypes.string,
            stroke: PropTypes.string,
            label: PropTypes.string
          })
        )
      })
    ),
    onUpdateAngle: PropTypes.func,
    scalable: PropTypes.bool,
    rotatable: PropTypes.bool
  };

  static defaultProps = {
    data: sampleData,
    onUpdateAngle: noop,
    scalable: false,
    rotatable: false
  };

  state = { currentAngle: 0 };

  constructor(props) {
    super(props);
    this.prevAngle = 0;
    this.currentAngle = 0;
    this.animating = false;
    this.scale = 1;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { currentAngle } = this.state;
    const { data } = this.props;
    return (
      nextState.currentAngle !== currentAngle || !isEqual(nextProps.data, data)
    );
  }

  onAngleChange = () => {
    if (!this.panel) return;
    const { onUpdateAngle } = this.props;
    this.currentAngle = ((this.currentAngle % 360) + 360) % 360;
    onUpdateAngle(this.currentAngle);
    this.onUpdatePanel();
  };

  onPanGesture = ({ nativeEvent: { translationX, translationY, x, y } }) => {
    if (this.animating) {
      this.animation.stop();
      this.animating = false;
      this.prevAngle = this.currentAngle % 360;
      this.onAngleChange();
    }
    const p1 = {
      x: x - translationX,
      y: y - translationY
    };
    const p2 = {
      x,
      y
    };
    let angle =
      Math.atan2(p2.y - this.cy, p2.x - this.cx) -
      Math.atan2(p1.y - this.cy, p1.x - this.cx);
    if (angle < 0) angle += 2 * Math.PI;
    this.currentAngle =
      this.prevAngle + (parseInt((angle * 180) / Math.PI, 10) % 360);

    this.onAngleChange();
  };

  onGestureStateChange = ({
    nativeEvent: { velocityX, velocityY, x, y, state }
  }) => {
    if (state === State.END || state === State.CANCELLED) {
      const p1 = {
        x,
        y
      };
      const p2 = {
        x: x + velocityX,
        y: y + velocityY
      };
      let angle =
        Math.atan2(p2.y - this.cy, p2.x - this.cx) -
        Math.atan2(p1.y - this.cy, p1.x - this.cx);
      if (angle > Math.PI) angle -= 2 * Math.PI;
      const angleVelocity =
        (Math.sign(angle) *
          Math.sqrt(velocityX * velocityX + velocityY * velocityY)) /
        5;
      if (this.animation) {
        this.animation.stop();
      }
      this.animation = Animation.create();
      this.animating = true;
      this.prevAngle = this.currentAngle;
      this.animation.start({
        from: this.prevAngle,
        to: this.prevAngle + angleVelocity,
        duration: 500,
        easing: Animation.easing.easeout,
        callback: v => {
          this.currentAngle = v;
          this.onAngleChange();
        },
        onload: v => {
          this.animating = false;
          this.currentAngle = v % 360;
          this.prevAngle = this.currentAngle;
          this.setState({ currentAngle: this.prevAngle });
          this.onAngleChange();
        }
      });
    }
  };

  onScale = value => {
    this.cy = (this.height / 2) * (value + 1);
    this.scale = value + 1;
    this.onUpdatePanel();
  };

  onUpdatePanel = () => {
    this.panel.setNativeProps({
      transform: [
        { scale: this.scale },
        { translateY: ((this.scale - 1) / this.scale / 2) * this.height },
        { rotate: (this.currentAngle * Math.PI) / 180 }
      ]
    });
  };

  render() {
    const { data, rotatable, scalable } = this.props;
    const { currentAngle } = this.state;
    const shapes = [];
    data.forEach(({ innerRadius, items }, index) => {
      const angles = d3
        .pie()
        .sort(null)
        .value(item => item.value)(items);
      const outerRadius =
        (data.length - 1 === index ? 100 : data[index + 1].innerRadius) ||
        innerRadius;
      const path = d3
        .arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
      shapes.push(
        ...angles.map(angle => ({
          ...angle,
          path: path(angle),
          innerRadius,
          outerRadius
        }))
      );
    });
    return (
      <>
        <PanGestureHandler
          onGestureEvent={rotatable ? this.onPanGesture : noop}
          onHandlerStateChange={rotatable ? this.onGestureStateChange : noop}
        >
          <PieChartWrapper
            ref={ref => {
              this.wrapper = ref;
            }}
            onLayout={() => {
              if (this.wrapper) {
                this.wrapper.measure((x, y, width, height) => {
                  if (this.cx && this.cy) return;
                  this.width = width;
                  this.height = height;
                  this.cx = this.width / 2;
                  this.cy = this.height / 2;
                });
              }
            }}
          >
            <Panel
              viewBox="-100 -100 200 200"
              ref={ref => {
                this.panel = ref;
              }}
            >
              {shapes.map(
                (
                  {
                    path,
                    data: { stroke, fill, label },
                    startAngle,
                    endAngle,
                    innerRadius,
                    outerRadius
                  },
                  index
                ) => {
                  const rotation =
                    ((startAngle + endAngle - Math.PI) * 90) / Math.PI;
                  const cx = (innerRadius + outerRadius) / 2;
                  const cy = 2;
                  return (
                    <Fragment key={index}>
                      <Path
                        d={path}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={0.5}
                      />
                      <G rotation={rotation}>
                        <Text
                          x={cx}
                          y={cy}
                          fontSize={5}
                          textAnchor="middle"
                          originX={cx}
                          originY={0}
                          rotation={
                            Math.abs(((rotation + currentAngle) % 360) - 180) >
                            90
                              ? 0
                              : 180
                          }
                        >
                          {label}
                        </Text>
                      </G>
                    </Fragment>
                  );
                }
              )}
            </Panel>
          </PieChartWrapper>
        </PanGestureHandler>
        {scalable && <Slider mt={30} onValueChange={this.onScale} />}
      </>
    );
  }
}

export default RouletteChart;
