import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EvilIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { noop } from 'lodash';
import { ScrollView } from 'react-native';

import { H5, TextInput } from 'elements';
import { ImagePicker, Tags, Vulnerability } from 'components';

const Container = styled(ScrollView)`
  width: 100%;
  border-radius: 10;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  max-height: 700px;
`;

const Header = styled.View`
  padding-horizontal: 10;
  padding-vertical: 15;
  background-color: ${({ theme }) => theme.COLORS.SECTION_BG};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextArea = styled.TouchableOpacity`
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-width: 1px;
  border-radius: 5px;
`;

const Text = styled(H5)`
  padding: 10px;
`;

const Title = styled(H5)`
  width: 80%;
`;

const ImagePickerWrapper = styled.View`
  margin: 20px auto 0px auto;
  width: 200px;
`;

const Body = styled.View`
  padding: 20px;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 30px;
`;

class ManualSection extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.node,
    hasDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.string),
    vulnerability: PropTypes.number
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    title: '',
    text: '',
    hasDelete: false,
    image: null,
    onDelete: noop,
    onUpdate: noop,
    tags: [],
    vulnerability: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      image: props.image,
      tags: props.tags,
      vulnerability: props.vulnerability,
      edit: false
    };
  }

  render() {
    const { currentTheme, formatMessage } = this.context;
    const { hasDelete, title, onDelete, onUpdate } = this.props;
    const { edit, text, image, tags, vulnerability } = this.state;

    return (
      <Container>
        <Header>
          <IconWrapper />
          <Title mb={0}>{title}</Title>

          <IconWrapper onPress={hasDelete ? onDelete : noop}>
            {hasDelete && (
              <EvilIcons
                name="trash"
                size={30}
                color={currentTheme.COLORS.PRIMARY}
              />
            )}
          </IconWrapper>
        </Header>
        <Body>
          <TextArea onPress={() => this.setState({ edit: true })}>
            {edit ? (
              <TextInput
                value={text}
                multiline
                onChangeText={text => this.setState({ text })}
                autoFocus
                onBlur={() => {
                  this.setState({ edit: false });
                  onUpdate({ text });
                }}
              />
            ) : (
              <Text align="left">
                {text || formatMessage('add.manual.placeholder')}
              </Text>
            )}
          </TextArea>
          <ImagePickerWrapper>
            <ImagePicker
              width={190}
              height={190}
              image={image}
              onChange={image => {
                onUpdate({ image });
              }}
            />
          </ImagePickerWrapper>

          <Tags
            defaultTags={tags}
            callback={newtags => {
              onUpdate({ tags: newtags });
            }}
          />
          <Vulnerability
            defaultValue={vulnerability}
            callback={vulnerability => {
              onUpdate({ vulnerability });
            }}
          />
        </Body>
      </Container>
    );
  }
}

export default ManualSection;
