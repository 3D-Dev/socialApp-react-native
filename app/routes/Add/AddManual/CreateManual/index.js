import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { noop } from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import { HeaderTitle, HeaderRight, Section, HeaderButton } from 'elements';
import { App, SwipperWithPlus } from 'components';
import { ManualSection } from 'routes/Add/AddManual/_components';
import storeFileInS3 from 'utils/s3';

class CreateManual extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    profileData: PropTypes.shape()
  };

  static defaultProps = {
    onAdd: noop
  };

  state = {
    title: '',
    text: '',
    tags: [],
    vulnerability: 1,
    loading: false
  };

  onAccept = async () => {
    const { title, text, image, tags, vulnerability } = this.state;
    let imgUrl = image;

    if (imgUrl && imgUrl !== '') {
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

    const { onAdd } = this.props;
    onAdd({ title, text, image: imgUrl, tags, vulnerability });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { title, text, tags, vulnerability, loading } = this.state;
    const disabled = !title || !text;

    return (
      <App>
        <HeaderTitle>{formatMessage('add.manual.headerTitle')}</HeaderTitle>
        <HeaderRight>
          <HeaderButton
            disabled={disabled}
            onPress={async () => {
              await this.onAccept();
              Actions['add.congrats']({ addType: 'Manual' });
            }}
          >
            {formatMessage('add.addButton')}
          </HeaderButton>
        </HeaderRight>
        <Spinner
          visible={loading}
          textContent={formatMessage('create.reflection', {
            reflection: 'User Manual'
          })}
          textStyle={{
            color: currentTheme.COLORS.PRIMARY
          }}
        />
        <Section style={{ height: 300 }}>
          <SwipperWithPlus
            isForSentence
            constantName="manual"
            defaultValue={title}
            callback={({ value, isNew }) => {
              this.setState({
                title: isNew
                  ? formatMessage('mocha.manual', { manual: value })
                  : formatMessage(`mocha.manual.${value}`)
              });
            }}
          />
        </Section>
        <Section>
          {Boolean(title) && (
            <ManualSection
              title={title}
              text={text}
              onUpdate={update => this.setState(update)}
              tags={tags}
              vulnerability={vulnerability}
            />
          )}
        </Section>
      </App>
    );
  }
}

export default CreateManual;
