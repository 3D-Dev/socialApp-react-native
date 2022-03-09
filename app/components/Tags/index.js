import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components';
import TagInput from 'react-native-tag-input';

import { MinimizedDropDown } from 'elements';
import { removeDuplicates } from 'utils/api';

const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5;
  padding-horizontal: 10;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  width: 100%;
`;

const Container = styled.View`
  align-items: flex-start;
  flex: 1;
`;

class Tags extends Component {
  static propTypes = {
    callback: PropTypes.func,
    defaultTags: PropTypes.arrayOf(PropTypes.string)
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    callback: () => {},
    defaultTags: []
  };

  constructor(props) {
    super(props);
    this.state = {
      tags: props.defaultTags
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { tags } = this.state;
    if (((prevState || {}).tags || []).length !== tags.length) {
      const { callback } = this.props;
      callback(tags);
    }
  }

  onChangeText = text => {
    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';'];
    if (parseWhen.indexOf(lastTyped) > -1) {
      const { tags, text } = this.state;
      const newTags = [...tags, text].filter(tag => tag !== '');
      this.setState({
        tags: removeDuplicates(newTags),
        text: ''
      });
    } else {
      this.setState({ text });
    }
  };

  labelExtractor = tag => tag;

  render() {
    const { tags, text } = this.state;
    const { currentTheme, formatMessage } = this.context;

    return (
      <Container align="left">
        <MinimizedDropDown
          minimized
          title={formatMessage('trustnetwork.tags.title')}
          displayText={formatMessage('trustnetwork.tags.displayText')}
        >
          <TagContainer>
            <TagInput
              value={tags}
              onChange={tags => {
                this.setState({ tags });
              }}
              labelExtractor={this.labelExtractor}
              text={text || ''}
              onChangeText={this.onChangeText}
              tagColor="transparent"
              tagTextColor={currentTheme.COLORS.PRIMARY}
              maxHeight={300}
              tagContainerStyle={{
                height: 36,
                marginTop: 0
              }}
              inputDefaultWidth={300}
              inputProps={{
                onSubmitEditing: e => {
                  this.setState({ text: '' });
                  const { nativeEvent } = e;
                  const { text } = nativeEvent;
                  setTimeout(() => {
                    const { tags } = this.state;
                    const newTags = [...tags, text].filter(tag => tag !== '');
                    this.setState({
                      tags: removeDuplicates(newTags)
                    });
                  }, 100);
                },
                keyboardType: 'default',
                placeholder: formatMessage('tag.input.placeholderText'),
                placeholderTextColor: currentTheme.COLORS.PRIMARY,
                style: {
                  fontSize: 14,
                  marginVertical: Platform.OS === 'ios' ? 10 : -2,
                  color: currentTheme.COLORS.PRIMARY
                }
              }}
            />
          </TagContainer>
        </MinimizedDropDown>
      </Container>
    );
  }
}

export default Tags;
