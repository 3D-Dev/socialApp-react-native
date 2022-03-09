import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Row, Col } from 'react-native-easy-grid';
import { noop } from 'lodash';

import {
  CheckBox,
  HeaderTitle,
  HeaderRight,
  ColCentered,
  Section,
  HeaderButton,
  H5,
  TextInput
} from 'elements';
import { App } from 'components';
import { GoalSection } from 'routes/Add/AddGoal/_components';

class CreateGoal extends Component {
  static propTypes = {
    data: PropTypes.shape(),
    onUpdate: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    data: {},
    onUpdate: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      data: { ...props.data.data }
    };
  }

  onChangeHandler = field => text => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [field]: text
      }
    });
  };

  onAccept = () => {
    const { onUpdate } = this.props;
    const { data } = this.state;
    onUpdate({ ...data });
    Actions.pop();
  };

  render() {
    const { formatMessage } = this.context;
    const { data } = this.state;

    return (
      <App>
        <HeaderTitle>
          {formatMessage('add.goal.manage.headerTitle')}
        </HeaderTitle>
        <HeaderRight>
          <HeaderButton onPress={this.onAccept}>
            {formatMessage('add.acceptButton')}
          </HeaderButton>
        </HeaderRight>
        <Section style={{ paddingTop: 40 }}>
          <GoalSection data={data} />
        </Section>
        <Section align="left">
          <H5 align="left" mb={15}>
            {formatMessage('add.goal.manage.explain')}
          </H5>
          <TextInput
            value={data.explain}
            onChangeText={this.onChangeHandler('explain')}
            multiline
            numberOfLines={2}
          />
        </Section>
        <Section>
          <Row>
            <ColCentered>
              <H5>{formatMessage('add.goal.manage.success')}</H5>
              <CheckBox
                onClick={() =>
                  this.onChangeHandler('success')(
                    data.success === true ? null : true
                  )
                }
                isChecked={data.success === true}
              />
            </ColCentered>
            <Col>
              <H5>{formatMessage('add.goal.manage.or')}</H5>
            </Col>
            <ColCentered>
              <H5>{formatMessage('add.goal.manage.failure')}</H5>
              <CheckBox
                onClick={() =>
                  this.onChangeHandler('success')(
                    data.success === false ? null : false
                  )
                }
                isChecked={data.success === false}
              />
            </ColCentered>
          </Row>
        </Section>
        <Section align="left">
          <H5 align="left" mb={15}>
            {formatMessage('add.goal.manage.learned')}
          </H5>
          <TextInput
            value={data.learned}
            onChangeText={this.onChangeHandler('learned')}
            multiline
            numberOfLines={2}
          />
        </Section>
      </App>
    );
  }
}

export default CreateGoal;
