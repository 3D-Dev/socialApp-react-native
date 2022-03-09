import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-native-easy-grid';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import styled from 'styled-components';
import moment from 'moment';
import { noop } from 'lodash';

import {
  Text,
  H4,
  RowCentered,
  ProgressBarAnimated,
  Avatar,
  ImageWithLoading
} from 'elements';

const Container = styled(Grid)`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BG};
  border-radius: 5;
  padding: 10px 10px 0px 10px;
  margin-vertical: 5;
  width: 100%;
  ${({ theme }) => `border: 1px solid ${theme.COLORS.BORDER};`}}
`;

const ImageWrapper = styled(Col)`
  width: 70;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5;
`;

const InfoWrapper = styled(Col)`
  padding-vertical: 5;
  padding-horizontal: 10;
`;

const Title = styled(H4)`
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }) => theme.COLORS.PRIMARY};
  margin-vertical: 5;
`;

const IconWrapper = styled(Col)`
  margin-right: 5;
  width: 30;
  justify-content: center;
`;

const TimelineWrapper = styled(Row)`
  margin-bottom: 10;
  align-items: flex-end;
`;

const Collaboraters = styled(Col)`
  width: 50;
  margin-right: 10;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
`;

const SuccessWrapper = styled(AntDesign)`
  position: absolute;
  right: 0;
  top: 0;
`;

class GoalSection extends Component {
  static propTypes = {
    forCreation: PropTypes.bool,
    data: PropTypes.shape(),
    onDelete: PropTypes.func,
    justShow: PropTypes.bool
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    forCreation: false,
    data: {},
    onDelete: noop,
    justShow: false
  };

  render() {
    const { currentTheme, formatMessage } = this.context;
    const { data, forCreation, onDelete, justShow } = this.props;
    const { collaboraters } = data;

    const to = moment(data.deadline)
      .endOf('day')
      .valueOf();
    const from = data.createdAt;
    const current = Date.now();
    const timeExpiredPercentage =
      5 + Math.min(Math.ceil(((current - from) * 95.0) / (to - from)), 95);
    return (
      <Container justShow={justShow}>
        <Row>
          <ImageWrapper>
            <ImageWithLoading
              image={data.image}
              width={68}
              height={68}
              imgStyle={{
                borderRadius: 5,
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            />
          </ImageWrapper>
          <InfoWrapper>
            <Title italic={!data.title && forCreation} align="left">
              {data.title ||
                (forCreation &&
                  formatMessage('add.goal.create.title.placeholder'))}
            </Title>
            <Row>
              <IconWrapper>
                <AntDesign
                  name="clockcircleo"
                  size={15}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </IconWrapper>
              <Col>
                <Text align="left">
                  {data.deadline
                    ? formatMessage('add.goal.date-by', {
                        date: moment(data.deadline).format('MMM D, YYYY')
                      })
                    : '-'}
                </Text>
              </Col>
            </Row>
            <Row>
              <IconWrapper>
                <Entypo
                  name="ruler"
                  size={15}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </IconWrapper>
              <Col>
                {data.measures &&
                  data.measures.map((measure, index) => (
                    <Text align="left" key={index}>
                      {measure || '-'}
                    </Text>
                  ))}
              </Col>
            </Row>
            <RowCentered>
              <IconWrapper>
                <MaterialCommunityIcons
                  name="account-group"
                  size={15}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </IconWrapper>
              <Col>
                <RowCentered>
                  <Col>
                    <Text align="left">
                      {collaboraters && collaboraters.length
                        ? formatMessage('add.goal.accountable', {
                            num: collaboraters.length
                          })
                        : '-'}
                    </Text>
                  </Col>
                  <Collaboraters>
                    {collaboraters &&
                      collaboraters.map((item, index) => (
                        <Avatar source={item.avatar} key={index} ml={-20} />
                      ))}
                  </Collaboraters>
                </RowCentered>
              </Col>
            </RowCentered>
          </InfoWrapper>
        </Row>
        {!forCreation && (
          <TimelineWrapper>
            <Col>
              <Text align="left">{formatMessage('add.goal.time-expired')}</Text>
              <ProgressBarAnimated value={timeExpiredPercentage} width={200} />
            </Col>
            {!justShow && (
              <IconWrapper onPress={onDelete}>
                <EvilIcons
                  name="trash"
                  size={30}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </IconWrapper>
            )}
          </TimelineWrapper>
        )}
        {data.success === true || data.success === false ? (
          <SuccessWrapper
            name={data.success ? 'checkcircle' : 'exclamationcircle'}
            size={30}
            color={currentTheme.COLORS.PRIMARY}
          />
        ) : null}
      </Container>
    );
  }
}

export default GoalSection;
