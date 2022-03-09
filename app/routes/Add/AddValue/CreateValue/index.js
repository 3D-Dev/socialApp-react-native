import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import {
  H5,
  Section,
  HeaderTitle,
  HeaderRight,
  TextInput,
  HeaderButton
} from 'elements';
import { App, ImagePicker, SwipperWithPlus } from 'components';
import storeFileInS3 from 'utils/s3';

const ImagePickerWrapper = styled.View`
  width: 200px;
  margin: 20px auto;
`;

class CreateValue extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    constantData: PropTypes.shape(),
    profileData: PropTypes.shape(),
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    onAdd: noop
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
      phrase: '',
      action: '',
      learn: '',
      image: '',
      loading: false
    };
  }

  onAddValue = async () => {
    const { value, phrase, action, learn, image } = this.state;
    let imgUrl = image;

    if (imgUrl !== '') {
      this.setState({ loading: true });
      const { profileData } = this.context;
      const userId = profileData._id || 'unregistered';
      imgUrl = await storeFileInS3(
        userId,
        image
        // , 'img'
      );
    }
    this.setState({ loading: false });
    const newValue = { value, phrase, action, learn, image: imgUrl };
    const { onAdd } = this.props;
    onAdd(newValue);
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { value, phrase, action, learn, image, loading } = this.state;
    const disabled = !value;

    return (
      <App>
        <HeaderTitle>{formatMessage('add.value.headerTitle')}</HeaderTitle>
        <HeaderRight>
          <HeaderButton
            disabled={disabled}
            onPress={async () => {
              await this.onAddValue();
              Actions['add.congrats']({ addType: 'Value' });
            }}
          >
            {formatMessage('add.addButton')}
          </HeaderButton>
        </HeaderRight>

        <Spinner
          visible={loading}
          textContent={formatMessage('create.reflection', {
            reflection: 'Value'
          })}
          textStyle={{
            color: currentTheme.COLORS.PRIMARY
          }}
        />
        <Section align="left" style={{ height: 330, paddingBottom: 0 }}>
          <SwipperWithPlus
            constantName="value"
            defaultValue={value}
            callback={({ value }) => {
              this.setState({ value: formatMessage(`mocha.value.${value}`) });
            }}
          />
        </Section>

        <Section align="left">
          <H5>{formatMessage('add.value.phrase')}</H5>
          <TextInput
            placeholder={formatMessage('add.value.phrase.placeholder')}
            multiline
            numberOfLines={2}
            onChangeText={phrase => this.setState({ phrase })}
            value={phrase}
          />
        </Section>
        <Section align="left">
          <H5>{formatMessage('add.value.action')}</H5>
          <TextInput
            placeholder={formatMessage('add.value.action.placeholder')}
            multiline
            numberOfLines={2}
            onChangeText={action => this.setState({ action })}
            value={action}
          />
        </Section>
        <Section align="left">
          <H5>{formatMessage('add.value.learn')}</H5>
          <TextInput
            placeholder={formatMessage('add.value.learn.placeholder')}
            multiline
            numberOfLines={7}
            onChangeText={learn => this.setState({ learn })}
            value={learn}
          />
        </Section>
        <Section>
          <H5>{formatMessage('add.value.video')}</H5>
          <ImagePickerWrapper>
            <ImagePicker
              width={190}
              height={190}
              image={image}
              onChange={image => this.setState({ image })}
            />
          </ImagePickerWrapper>
        </Section>
      </App>
    );
  }
}

export default CreateValue;
