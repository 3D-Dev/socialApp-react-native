import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Row, Col } from 'react-native-easy-grid';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { noop } from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Section,
  Text,
  H5,
  HeaderTitle,
  HeaderRight,
  HeaderButton,
  TextInput
} from 'elements';
import { App, ImagePicker, AddUsers, DateTimePicker } from 'components';
import { GoalSection } from 'routes/Add/AddGoal/_components';
import storeFileInS3 from 'utils/s3';
import moment from 'moment';

const IconWrapper = styled(Col)`
  margin-right: 10;
  width: 20;
`;

const MeasureWrapper = styled(Row)`
  align-items: center;
  margin-bottom: 3;
`;

const IconRightWrapper = styled(Col)`
  width: 40;
  align-items: center;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}}
`;

const ImagePickerWrapper = styled.View`
  width: 200px;
  margin: 20px auto;
`;

const DatePickerWrapper = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

class CreateGoal extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func,
    profileData: PropTypes.shape()
  };

  static defaultProps = {
    onAdd: noop
  };

  state = {
    data: {
      deadline: Date.now(),
      measures: [''],
      collaboraters: []
    },
    isDialogOpened: false,
    when: new Date(),
    isOpenedDatePicker: false
  };

  onChangeHandler = field => text => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [field]: text
      }
    });
  };

  onChangeMeasure = (index, measure) => {
    const { data } = this.state;
    data.measures[index] = measure;
    this.setState({
      data: {
        ...data,
        measures: [...data.measures]
      }
    });
  };

  onInsertMeasureHandler = index => () => {
    const { data } = this.state;
    data.measures.splice(index + 1, 0, '');
    this.setState({
      data: {
        ...data,
        measures: [...data.measures]
      }
    });
  };

  onRemoveMeasureHandler = index => () => {
    const { data } = this.state;
    data.measures.splice(index, 1);
    this.setState({
      data: {
        ...data,
        measures: [...data.measures]
      }
    });
  };

  onAdd = async () => {
    const { onAdd } = this.props;
    const { data } = this.state;

    let imgUrl = data.image;
    if (imgUrl && imgUrl !== '') {
      this.setState({ loading: true });
      const { profileData } = this.context;
      const userId = profileData._id || 'unregistered';
      imgUrl = await storeFileInS3(userId, data.image);
    }
    data.image = imgUrl;
    this.setState({ loading: false });

    onAdd({ ...data, createdAt: Date.now() });
  };

  showDatePicker = () => {
    this.setState({ isOpenedDatePicker: true });
  };

  hideDatePicker = () => {
    this.setState({ isOpenedDatePicker: false });
  };

  handleConfirm = date => {
    const { data } = this.state;
    this.setState({
      when: date,
      data: {
        ...data,
        deadline: date.getTime()
      }
    });
    this.hideDatePicker();
  };

  render() {
    const { currentTheme, formatMessage } = this.context;
    const {
      data,
      isDialogOpened,
      loading,
      when,
      isOpenedDatePicker
    } = this.state;
    const disabled =
      !data.title ||
      // !data.image ||
      !data.deadline ||
      !data.measures ||
      !data.measures.length ||
      // !data.collaboraters.length ||
      isDialogOpened;

    return (
      <App>
        <HeaderTitle>
          {formatMessage('add.goal.create.headerTitle')}
        </HeaderTitle>

        {!isDialogOpened && (
          <HeaderRight>
            <HeaderButton
              disabled={disabled}
              onPress={async () => {
                await this.onAdd();
                Actions['add.congrats']({ addType: 'Goal' });
              }}
            >
              {formatMessage('add.addButton')}
            </HeaderButton>
          </HeaderRight>
        )}

        <Spinner
          visible={loading}
          textContent={formatMessage('create.reflection', {
            reflection: 'Goal'
          })}
          textStyle={{
            color: currentTheme.COLORS.PRIMARY
          }}
        />
        <Section style={{ paddingTop: 40 }}>
          <GoalSection forCreation data={data} />
        </Section>
        <Section align="left">
          <H5 align="left" mb={15}>
            {formatMessage('add.goal.create.objective-questions')}
          </H5>
          <TextInput
            value={data.title}
            placeholder={formatMessage('add.goal.create.titlePlaceholder')}
            onChangeText={this.onChangeHandler('title')}
          />
        </Section>
        <Section align="left">
          <Row>
            <IconWrapper>
              <AntDesign
                name="clockcircleo"
                size={15}
                color={currentTheme.COLORS.PRIMARY}
              />
            </IconWrapper>
            <Col>
              <H5 align="left" mb={15}>
                {formatMessage('add.goal.create.when')}
              </H5>
              <TouchableOpacity onPress={this.showDatePicker}>
                <DatePickerWrapper>
                  <Text align="left">
                    {moment(when).format('MMMM  D  YYYY')}
                  </Text>
                  <Entypo
                    name="edit"
                    size={15}
                    color={currentTheme.COLORS.PRIMARY}
                  />
                </DatePickerWrapper>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={isOpenedDatePicker}
                mode="date"
                date={when}
                minimumDate={new Date()}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            </Col>
          </Row>
        </Section>
        <Section align="left">
          <Row>
            <IconWrapper>
              <Entypo
                name="ruler"
                size={15}
                color={currentTheme.COLORS.PRIMARY}
              />
            </IconWrapper>
            <Col key={data.measures.length}>
              <H5 align="left">{formatMessage('add.goal.create.measure')}</H5>
              <Text align="left" mb={15}>
                {formatMessage('add.goal.create.measure_description')}
              </Text>
              {data.measures.map((measure, index) => (
                <MeasureWrapper key={index}>
                  <Col>
                    <TextInput
                      value={measure}
                      onChangeText={text => this.onChangeMeasure(index, text)}
                    />
                  </Col>
                  <IconRightWrapper
                    onPress={this.onInsertMeasureHandler(index)}
                  >
                    <AntDesign
                      name="plus"
                      size={25}
                      color={currentTheme.COLORS.PRIMARY}
                    />
                  </IconRightWrapper>
                  <IconRightWrapper
                    onPress={this.onRemoveMeasureHandler(index)}
                    disabled={data.measures.length < 2}
                  >
                    <AntDesign
                      name="minus"
                      size={25}
                      color={currentTheme.COLORS.PRIMARY}
                    />
                  </IconRightWrapper>
                </MeasureWrapper>
              ))}
            </Col>
          </Row>
        </Section>
        <Section align="left" style={{ paddingBottom: 0 }}>
          <Row>
            <IconWrapper>
              <MaterialCommunityIcons
                name="account-group"
                size={15}
                color={currentTheme.COLORS.PRIMARY}
              />
            </IconWrapper>
            <Col>
              <H5 align="left">{formatMessage('add.goal.create.support')}</H5>
              <Row>
                <AddUsers
                  userList={data.collaboraters}
                  callback={res => {
                    const { data } = this.state;
                    this.setState({
                      data: {
                        ...data,
                        collaboraters: res
                      }
                    });
                  }}
                  setModalStatus={status => {
                    this.setState({
                      isDialogOpened: status
                    });
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Section>

        <Section style={{ paddingTop: 0 }}>
          <Text mb={5}>{formatMessage('add.goal.create.upload-image')}</Text>
          <ImagePickerWrapper>
            <ImagePicker
              width={200}
              height={200}
              image={data.image}
              onChange={this.onChangeHandler('image')}
            />
          </ImagePickerWrapper>
        </Section>
      </App>
    );
  }
}

export default CreateGoal;
