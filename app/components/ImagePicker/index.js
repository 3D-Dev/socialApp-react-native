import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';
import * as ExpoImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { noop } from 'lodash';

import { ImageWithLoading } from 'elements';

const Container = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  align-self: center;  
  border-radius: 5;
  ${({ circle }) => circle && ' border-radius: 150;'}
  ${({ noPadding }) => (noPadding ? 'padding: 0px;' : 'padding: 5px;')}
  ${({ theme }) => `border: 1px solid ${theme.COLORS.BORDER};`}
`;

export default class ImagePicker extends Component {
  static propTypes = {
    image: PropTypes.string,
    onChange: PropTypes.func,
    circle: PropTypes.bool,
    icon: PropTypes.string,
    noPadding: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    onChange: noop,
    circle: false,
    image: '',
    icon: 'upload',
    noPadding: false
  };

  constructor(props) {
    super(props);

    this.state = { image: props.image };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  componentWillReceiveProps(nextProps) {
    const { image } = this.props;
    if (nextProps.image !== image) {
      this.setState({ image: nextProps.image });
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        // eslint-disable-next-line no-alert
        // alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    const { onChange } = this.props;
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri }, onChange(result.uri));
    }
  };

  render() {
    const { currentTheme } = this.context;
    const { circle, icon, noPadding, width, height } = this.props;
    const { image } = this.state;

    return (
      <Container onPress={this.pickImage} circle={circle} noPadding={noPadding}>
        {image ? (
          <ImageWithLoading
            image={image}
            width={width}
            height={height}
            circle={circle}
          />
        ) : (
          <AntDesign
            name={icon}
            size={50}
            color={currentTheme.COLORS.PRIMARY}
          />
        )}
      </Container>
    );
  }
}
