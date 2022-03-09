import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

import { H5, H6, TextInput, RoundButton } from 'elements';

const Container = styled.View`
  width: 100%;
  border-radius: 10;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  margin-bottom: ${({ mb }) => mb}px;
`;

const Header = styled.View`
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.COLORS.SECTION_BG};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled(H5)`
  width: 100%;
`;

const Body = styled.View`
  padding: 20px 10px;
`;

const ButtonWrapper = styled.View`
  margin: 0 0 0 auto;
  width: 90px;
`;

class ReviewFeedBackBox extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    mb: PropTypes.number,
    editable: PropTypes.bool,
    leaveClicked: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    title: '',
    text: '',
    mb: 0,
    editable: false
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      answer: props.text || ''
    };
  }

  render() {
    const { formatMessage } = this.context;
    const { title, mb, editable, leaveClicked } = this.props;
    const { editing, answer } = this.state;
    return (
      <Container mb={mb}>
        <Header>
          <Title align="center" mb={0}>
            {title}
          </Title>
        </Header>
        <Body>
          <TouchableOpacity onPress={() => this.setState({ editing: true })}>
            {editable && editing ? (
              <TextInput
                value={answer}
                multiline
                onChangeText={answer => this.setState({ answer })}
                autoFocus
                onBlur={() => {
                  this.setState({ editing: false });
                }}
              />
            ) : (
              <H5 align="left">
                {answer || formatMessage('feedback.review.input.placeholder')}
              </H5>
            )}
          </TouchableOpacity>
          {editable && (
            <ButtonWrapper>
              <RoundButton
                mb={0}
                disabled={answer === ''}
                onPress={() => {
                  leaveClicked(answer);
                }}
              >
                <H6>{formatMessage('feedback.leave')}</H6>
              </RoundButton>
            </ButtonWrapper>
          )}
        </Body>
      </Container>
    );
  }
}

export default ReviewFeedBackBox;
