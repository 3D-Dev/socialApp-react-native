import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'react-native-easy-grid';

import { H5, SmallText, NoAvatar, Avatar } from 'elements';

import { AvatarArea } from '../RequestFBBox';

const Container = styled.View`
  width: 100%;
  border-radius: 10;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
`;

const Header = styled.View`
  padding: 10px;
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
  padding: 10px;
`;

const RowContainer = styled(Row)`
  margin-bottom: 25px;
`;

class FeedbackBox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  render() {
    const { name, avatar, feedback, question } = this.props;

    return (
      <RowContainer>
        <AvatarArea>
          {avatar !== '' ? (
            <Avatar source={avatar} size={60} />
          ) : (
            <NoAvatar size={60} />
          )}

          <SmallText align="left">{name}</SmallText>
        </AvatarArea>
        <Col style={{ marginLeft: 10 }}>
          <Container>
            <Header>
              <Title align="center" mb={0}>
                {question}
              </Title>
            </Header>
            <Body>
              <H5 align="left">{feedback}</H5>
            </Body>
          </Container>
        </Col>
      </RowContainer>
    );
  }
}

export default FeedbackBox;
