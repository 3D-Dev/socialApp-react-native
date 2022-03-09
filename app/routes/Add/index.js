import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { App } from 'components';
import { HeaderTitle } from 'elements';
import { concepts, reflections } from 'constants/mocha';

import { ConceptBox } from './_components';

const Add = ({}, { formatMessage, appSettings, profileData }) => {
  return (
    <App hasBack={!appSettings.isOpened}>
      <HeaderTitle>{formatMessage('add.headerTitle')}</HeaderTitle>
      {reflections.map(cKey => {
        const title = `concept.${cKey}.title`;
        const description = `concept.${cKey}.description`;
        const Reflection = (
          <ConceptBox
            type={(appSettings && appSettings.appType) || 'normal'}
            key={cKey}
            id={cKey}
            startTime={concepts[cKey].startTime}
            endTime={concepts[cKey].endTime}
            title={formatMessage(title)}
            description={formatMessage(description)}
            src={concepts[cKey].img}
            value={concepts[cKey].value}
            unit={concepts[cKey].unit}
          />
        );
        if (!profileData._id) {
          if (cKey !== 'goal' && cKey !== 'feedback') {
            return Reflection;
          }
        } else {
          return Reflection;
        }
        return <View key={cKey} />;
      })}
    </App>
  );
};

Add.contextTypes = {
  formatMessage: PropTypes.func,
  appSettings: PropTypes.shape(),
  setAppSettings: PropTypes.func,
  profileData: PropTypes.shape()
};

export default Add;
