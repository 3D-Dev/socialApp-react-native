import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Col, Grid } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';
import { countBy } from 'lodash';

import {
  H4,
  H2,
  Text,
  RoundButton,
  Section,
  HeaderTitle,
  HeaderRight
} from 'elements';
import { App } from 'components';
import { generateReflectionComponent } from 'routes/Add/_components';
import { isToday, isCurrentWeek } from 'utils/dates';

const GridWrap = styled(Grid)`
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const TapWrapper = styled(Col)`
  align-self: stretch;
  aspect-ratio: 0.9;
  border-width: 1;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 7;
  margin-vertical: 15;
  margin-horizontal: 15;
  min-width: 40%;
  ${({ active }) => active && 'border-width: 2;'}
  ${({ disabled }) =>
    disabled &&
    `
    border-color: transparent;
  `}
`;

const Tap = styled.TouchableOpacity`
  align-self: stretch;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px 20px 20px;
`;

const PlusTap = styled.TouchableOpacity`
  align-self: stretch;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InfoWrapper = styled.View`
  align-self: stretch;
`;

const InfoRowWrapper = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 5;
  right: 5;
`;

class TapToCount extends generateReflectionComponent('Tap') {
  onAddTap = tap => {
    this.onAddReflection({ ...tap, times: [Date.now()] });
  };

  onInputTap = () => {
    Actions['add.tap.input']({ onAddTap: this.onAddTap });
  };

  onReset = () => {
    const {
      appSettings,
      removeReflections,
      resetReflections,
      reflection
    } = this.context;
    const taps = reflection.filter(({ type }) => type === 'Tap');
    const allTaps = taps.map(tap => ({
      ...tap,
      removed: new Date(Date.now()).toISOString()
    }));
    if (appSettings.online) {
      const tapIds = taps.filter(({ _id }) => _id).map(({ _id }) => _id);
      const tapWithoutIds = taps
        .filter(({ _id }) => !_id)
        .map(tap => ({
          ...tap,
          removed: new Date(Date.now()).toISOString()
        }));
      if (tapIds.length) {
        removeReflections({
          data: [tapIds],
          onSuccess: () => {
            resetReflections(tapWithoutIds, 'Tap');
          },
          onFailure: () => {
            resetReflections(allTaps, 'Tap');
          }
        });
      } else {
        resetReflections(allTaps, 'Tap');
      }
    } else {
      resetReflections(allTaps, 'Tap');
    }
  };

  render() {
    const {
      formatMessage,
      currentTheme,
      reflection,
      reflectionRequesting
    } = this.context;
    const taps = reflection
      .filter(({ type }) => type === 'Tap')
      .map(tap => ({
        ...tap,
        todayCount:
          countBy(tap.data.times, time => isToday(new Date(time))).true || 0,
        weekCount:
          countBy(tap.data.times, time => isCurrentWeek(new Date(time))).true ||
          0
      }));
    return (
      <App loading={reflectionRequesting}>
        <HeaderTitle>{formatMessage('add.tap.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <Section>
          <H2 mt={30} bold>
            {formatMessage('add.tap.heading')}
          </H2>
        </Section>
        <Section>
          <GridWrap>
            {taps.map(
              (
                { _id, data: { text, times }, todayCount, weekCount, removed },
                index
              ) =>
                removed ? null : (
                  <TapWrapper key={index}>
                    <Tap
                      onPress={() =>
                        this.onUpdateReflection(
                          { times: [...times, Date.now()] },
                          _id,
                          index
                        )
                      }
                    >
                      <H4 bold>{text}</H4>
                      <InfoWrapper>
                        <InfoRowWrapper>
                          <Text>{formatMessage('today')}</Text>
                          <H2 bold>{todayCount}</H2>
                        </InfoRowWrapper>
                        <InfoRowWrapper>
                          <Text>{formatMessage('week')}</Text>
                          <H2 bold>{weekCount}</H2>
                        </InfoRowWrapper>
                      </InfoWrapper>
                      <CloseButton
                        onPress={() => this.onRemoveReflection(_id, index)}
                      >
                        <AntDesign
                          name="close"
                          size={25}
                          color={currentTheme.COLORS.PRIMARY}
                        />
                      </CloseButton>
                    </Tap>
                  </TapWrapper>
                )
            )}
            <TapWrapper>
              <PlusTap onPress={this.onInputTap}>
                <AntDesign
                  name="plus"
                  size={60}
                  color={currentTheme.COLORS.PRIMARY}
                />
              </PlusTap>
            </TapWrapper>
            {Boolean(taps.length % 2 === 0) && <TapWrapper disabled />}
          </GridWrap>
        </Section>
        <Section>
          <RoundButton
            onPress={() => {
              this.onReset();
            }}
            isFullWidth
          >
            <H4>{formatMessage('Reset to zero')}</H4>
          </RoundButton>
        </Section>
      </App>
    );
  }
}

export default TapToCount;
