import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Row, Col } from 'react-native-easy-grid';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';

import { Section, HeaderTitle, HeaderRight, H6 } from 'elements';
import { App } from 'components';
import { generateReflectionComponent } from 'routes/Add/_components';

import { GoalSection } from './_components';

const PriorityLabelWrapper = styled(Col)`
  width: 60;
  align-items: center;
  justify-content: center;
`;

class AddGoal extends generateReflectionComponent('Goal') {
  onOpenCreateGoal = () => {
    Actions['add.goal.create']({ onAdd: this.onAddReflection });
  };

  onOpenManageGoal = index => {
    const { reflection } = this.context;
    const goals = reflection.filter(({ type }) => type === 'Goal');
    Actions['add.goal.manage']({
      data: goals[index],
      onUpdate: goal => this.onUpdateReflection(goal, goals[index]._id, index)
    });
  };

  render() {
    const {
      currentTheme,
      formatMessage,
      reflection,
      reflectionRequesting
    } = this.context;
    const goals = reflection
      .filter(({ type }) => type === 'Goal')
      .map(({ data, ...rest }) => ({ ...data, ...rest }));

    return (
      <App loading={reflectionRequesting}>
        <HeaderTitle>{formatMessage('add.goal.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <Section>
          <Row>
            <PriorityLabelWrapper>
              <H6>{formatMessage('add.goal.priority')}</H6>
            </PriorityLabelWrapper>
            <Col style={{ justifyContent: 'center' }}>
              <H6>{formatMessage('add.goal.goals')}</H6>
            </Col>
          </Row>
          {goals.map((goal, index) =>
            goal.removed ? null : (
              <Row key={index}>
                <PriorityLabelWrapper>
                  <H6>{index + 1}</H6>
                </PriorityLabelWrapper>
                <Col onPress={() => this.onOpenManageGoal(index)}>
                  <GoalSection
                    data={goal}
                    onDelete={() => this.onRemoveReflection(goal._id, index)}
                    type="normal"
                  />
                </Col>
              </Row>
            )
          )}
        </Section>

        <Section align="left">
          <TouchableOpacity onPress={this.onOpenCreateGoal}>
            <AntDesign
              name="plus"
              size={60}
              color={currentTheme.COLORS.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </App>
    );
  }
}

export default AddGoal;
