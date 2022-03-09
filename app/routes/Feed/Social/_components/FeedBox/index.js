import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Col, Row } from 'react-native-easy-grid';
import AutoHeightImage from 'react-native-auto-height-image';

import { H5, H6, NoAvatar, Avatar } from 'elements';

const RowContainer = styled(Row)`
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 50;
  border-width: 2px;
  padding: 20px 5px;
  margin-bottom: 10px;
`;

class FeedBox extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    voted: PropTypes.bool.isRequired,
    asset: PropTypes.node,
    upVotePressed: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatar: PropTypes.node
    }).isRequired,
    onPress: PropTypes.func.isRequired
  };

  static contextTypes = {
    currentTheme: PropTypes.shape()
  };

  static defaultProps = {
    asset: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.voted
    };
  }

  render() {
    const { user, text, upVotePressed, asset, onPress } = this.props;
    const { isFavorite } = this.state;
    const { currentTheme } = this.context;

    return (
      <RowContainer theme={currentTheme}>
        <Col style={{ width: 70, alignItems: 'center' }}>
          <TouchableOpacity onPress={onPress}>
            {user.avatar ? (
              <Avatar source={user.avatar} size={70} />
            ) : (
              <NoAvatar size={70} />
            )}
            <H6 align="left">{user.name}</H6>
          </TouchableOpacity>
        </Col>
        <Col
          style={{
            alignItems: 'center',
            paddingHorizontal: 1
          }}
        >
          <H5 align="left">{text}</H5>
          {asset && (
            <AutoHeightImage
              width={200}
              source={asset}
              style={{ marginTop: 5 }}
            />
          )}
        </Col>
        <Col
          style={{ width: 18, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={() => {
              const { isFavorite } = this.state;
              this.setState({ isFavorite: !isFavorite });
              upVotePressed();
            }}
          >
            {isFavorite ? (
              <AutoHeightImage
                width={18}
                source={require('assets/images/icons/up_voted.png')}
              />
            ) : (
              <AutoHeightImage
                width={18}
                source={require('assets/images/icons/up.png')}
              />
            )}
          </TouchableOpacity>
        </Col>
      </RowContainer>
    );
  }
}

export default FeedBox;
