import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons';

import H5 from './texts/H4';
import H6 from './texts/H6';

const Container = styled.View`
  border-radius: 10;
  border-width: 1px;
  border-color: ${({ border, theme }) =>
    border ? `${theme.COLORS.BORDER}` : 'transparent'};
  width: 100%;
  margin-top: 20px;
`;

const IconWrapper = styled.TouchableOpacity`
  align-items: flex-end;
`;

class MinimizedDropDown extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    displayText: PropTypes.string,
    minimized: PropTypes.bool,
    border: PropTypes.bool
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    title: '',
    displayText: '',
    minimized: true,
    border: false
  };

  constructor(props) {
    super(props);
    this.state = {
      minimized: props.minimized
    };
  }

  render() {
    const { minimized } = this.state;
    const { children, title, border, displayText } = this.props;
    const { currentTheme } = this.context;

    return (
      <Container border={border}>
        <Row>
          <Col>
            <H5 align="left">{title}</H5>
          </Col>
          <Col>
            <IconWrapper
              onPress={() => {
                this.setState({ minimized: !minimized });
              }}
            >
              <AntDesign
                name={!minimized ? 'up' : 'down'}
                size={25}
                color={currentTheme.COLORS.PRIMARY}
              />
            </IconWrapper>
          </Col>
        </Row>
        {!minimized && displayText !== '' && (
          <Row>
            <H6 align="left" mb={10}>
              {displayText}
            </H6>
          </Row>
        )}

        {!minimized && <Row>{children}</Row>}
      </Container>
    );
  }
}

export default MinimizedDropDown;
