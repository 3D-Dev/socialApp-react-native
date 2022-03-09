import React from 'react';
import PropTypes from 'prop-types';
import { Image as RNImage, ViewPropTypes } from 'react-native';

import Pie from 'react-native-progress/Pie';
import Image from 'react-native-image-progress';
import EmptyImage from 'assets/images/empty.png';

class ImageWithLoading extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    circle: PropTypes.bool,
    imgStyle: ViewPropTypes.style
  };

  static defaultProps = {
    circle: false,
    image: '',

    imgStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      failed: false
    };
  }

  errorHandle = () => {
    this.setState({ failed: true });
  };

  render() {
    const { image, width, height, circle, imgStyle } = this.props;
    const imageStyle = {
      width,
      height,
      borderRadius: circle ? width / 2 : 0
    };
    const { failed } = this.state;

    if (failed || !image) {
      return <RNImage source={EmptyImage} style={[imageStyle, imgStyle]} />;
    }

    return (
      <Image
        source={{ uri: image }}
        indicator={Pie}
        indicatorProps={{
          size: width,
          borderWidth: 0,
          color: 'rgba(150, 150, 150, 1)',
          unfilledColor: 'rgba(200, 200, 200, 0.2)'
        }}
        style={[imageStyle, imgStyle]}
        imageStyle={imageStyle}
        onError={this.errorHandle}
      />
    );
  }
}

export default ImageWithLoading;
