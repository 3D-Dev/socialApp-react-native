import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';
import * as ExpoImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { noop } from 'lodash';
import { Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ImageWithLoading, NoAvatar } from 'elements';

import storeFileInS3 from 'utils/s3';

const { width } = Dimensions.get('window');

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: stretch;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 90;
  aspect-ratio: 1;
  width: ${width / 2 - 20};
`;

class AvatarUpload extends Component {
  static propTypes = {
    image: PropTypes.string,
    onChange: PropTypes.func,
    justShow: PropTypes.bool
  };

  static contextTypes = {
    profileData: PropTypes.shape(),
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    onChange: noop,
    justShow: false,
    image: ''
  };

  constructor(props) {
    super(props);
    this.state = { image: props.image, loading: false };
  }

  componentDidMount() {
    this.getPermissionAsync();
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
      aspect: [4, 3],
      quality: 0
    });

    if (!result.cancelled) {
      this.setState({ loading: true });
      const { profileData } = this.context;
      const userId = profileData._id || 'unregistered';
      const imgUrl = await storeFileInS3(
        userId,
        result.uri
        // , 'img'
      );

      this.setState({ image: result.uri });
      onChange(imgUrl);
      this.setState({ loading: false });
    }
  };

  render() {
    const { currentTheme, formatMessage } = this.context;
    const { image, loading } = this.state;
    const { justShow } = this.props;

    const isNoAvatar = justShow && !image;
    const choose = justShow && !image;
    const display = !!(!loading && image);

    return (
      <Container
        onPress={() => {
          if (!justShow) {
            this.pickImage();
          }
        }}
      >
        <Spinner
          visible={loading}
          textContent={formatMessage('uploading')}
          textStyle={{
            color: currentTheme.COLORS.PRIMARY
          }}
        />
        {isNoAvatar && <NoAvatar size={width / 2 - 20} />}
        {choose && (
          <AntDesign
            name="upload"
            size={100}
            color={currentTheme.COLORS.PRIMARY}
          />
        )}
        {display && (
          <ImageWithLoading
            image={image}
            width={width / 2 - 20}
            height={width / 2 - 20}
            circle
          />
        )}
      </Container>
    );
  }
}

export default AvatarUpload;
