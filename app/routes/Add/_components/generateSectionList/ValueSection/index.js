import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EvilIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { Row, Col } from 'react-native-easy-grid';
import { View } from 'react-native';

import { H4 } from 'elements';
import { ImagePicker } from 'components';

import SubTextArea from './SubTextArea';
import CollapseButton from './CollapseButton';

const Container = styled.View`
  padding: 10px;
  border-radius: 10;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  margin: 15px;
`;

const ImagePickerWrapper = styled(Col)`
  width: 120px;
  justify-content: center;
`;

const Header = styled(Row)`
  justify-content: space-between;
  height: 27;
  padding-left: 10;
`;

const CollapseWrapper = styled(Row)`
  justify-content: flex-end;
  height: 27;
  padding-left: 10;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 30px;
`;

class ValueSection extends Component {
  static propTypes = {
    data: PropTypes.shape(),
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    data: {},
    onUpdate: () => {},
    onDelete: () => {}
  };

  state = { minimized: false };

  render() {
    const { currentTheme } = this.context;
    const { data, onUpdate, onDelete } = this.props;
    const { minimized } = this.state;

    return (
      <Container>
        <Row>
          <ImagePickerWrapper>
            <ImagePicker
              width={110}
              height={110}
              image={data.image}
              noPadding
              onChange={image => {
                onUpdate({ image });
              }}
            />
          </ImagePickerWrapper>
          <Col>
            <Header>
              <H4 mb={0}>{data.value.replace(/_/g, ' ')}</H4>
              <IconWrapper onPress={onDelete}>
                <EvilIcons
                  name="trash"
                  size={30}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </IconWrapper>
            </Header>

            <Row style={{ justifyContent: 'center', paddingLeft: 10 }}>
              <SubTextArea
                value={data.phrase}
                name="phrase"
                onUpdate={phrase => {
                  onUpdate({ phrase });
                }}
              />
            </Row>
            <CollapseWrapper>
              <CollapseButton
                isOpen={!minimized}
                onUpdate={() => this.setState({ minimized: !minimized })}
                size={25}
              />
            </CollapseWrapper>
          </Col>
        </Row>

        {!minimized && (
          <View style={{ marginTop: 15 }}>
            <SubTextArea
              value={data.action}
              name="action"
              onUpdate={action => {
                onUpdate({ action });
              }}
              mb={15}
            />
            <SubTextArea
              value={data.learn}
              name="learn"
              onUpdate={learn => {
                onUpdate({ learn });
              }}
            />
          </View>
        )}
      </Container>
    );
  }
}

export default ValueSection;
