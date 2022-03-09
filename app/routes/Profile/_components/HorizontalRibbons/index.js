import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { H4, H5 } from 'elements';
import { FlatListWithEnd } from 'components';
import { GoalSection } from 'routes/Add/AddGoal/_components';

import Activity from './Activity';
import ValueCard from './Value';
import ManualCard from './Manual';

const { width } = Dimensions.get('window');

const Container = styled.View`
  padding-horizontal: 10px;
  margin-bottom: 20px;
`;

const NoData = styled.View`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8;
  margin-horizontal: 10px;
`;

const HorizontalRibbons = ({ type, contents, justShow }, { formatMessage }) => {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          if (!justShow) {
            if (type === 'activity') {
              Actions.feed();
            } else {
              Actions[`add.${type.toLowerCase()}`]();
            }
          }
        }}
        style={{ paddingLeft: 10 }}
      >
        <H4 align="left" mt={20} mb={10}>
          {formatMessage(`profile.${type}.title`)}
        </H4>
      </TouchableOpacity>

      {contents.length === 0 ? (
        <NoData>
          <H5 mt={30} mb={30}>
            {formatMessage(
              justShow ? 'feed.profile.noData' : 'profile.noData',
              {
                type: type === 'activity' ? 'activitie' : type
              }
            )}
          </H5>
        </NoData>
      ) : (
        <FlatListWithEnd
          horizontal
          scrollEnabled
          data={contents}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => {
            if (item) {
              if (type === 'activity') {
                return <Activity item={item} />;
              }
              if (type === 'Value') {
                return (
                  <ValueCard id={item.updated} content={item.data || {}} />
                );
              }
              if (type === 'Manual') {
                return (
                  <ManualCard id={item.updated} content={item.data || {}} />
                );
              }
              if (type === 'Goal') {
                return (
                  <View style={{ paddingHorizontal: 10, width: width - 40 }}>
                    <GoalSection data={item.data} justShow />
                  </View>
                );
              }
            }
            return <View />;
          }}
        />
      )}
    </Container>
  );
};

HorizontalRibbons.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.string.isRequired,
  justShow: PropTypes.bool
};

HorizontalRibbons.contextTypes = {
  formatMessage: PropTypes.func
};

HorizontalRibbons.defaultProps = {
  contents: [],
  justShow: false
};

export default HorizontalRibbons;
