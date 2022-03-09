/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, findNodeHandle, Dimensions } from 'react-native';
import { Content as NBContent } from 'native-base';

import { App, Chart } from 'components';
import { Section, H4, HeaderTitle, HeaderRight } from 'elements';
import { convertDataToChartModels } from 'utils/generateFakeChartData';
import { reflections } from 'constants/mocha';

import { TopCategoryButtons } from './_components';

class Analyze extends Component {
  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const concepts = convertDataToChartModels(reflections);

    return (
      <App isScrollContent={false}>
        <HeaderTitle>{formatMessage('analyze.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <NBContent
          enableOnAndroid
          extraScrollHeight={150}
          contentContainerStyle={{ flexGrow: 1 }}
          ref={c => (this.content = c)}
        >
          <Section align="left">
            <TopCategoryButtons
              currentTheme={currentTheme}
              scrollTo={key => {
                this[`${key}_ref`].measureLayout(
                  findNodeHandle(this.content._root),
                  // eslint-disable-next-line no-unused-vars
                  (x, y, width, height, pageX, pageY) => {
                    this.content._root.scrollToPosition(0, y, true);
                  }
                );
              }}
              concepts={concepts}
            />
            <View style={{ marginTop: 15 }}>
              {concepts.map(concept => {
                const title = formatMessage(`concept.${concept.name}.title`);
                const ref = `${concept.name}_ref`;

                return (
                  <View
                    key={`${ref}_key`}
                    ref={c => {
                      this[ref] = c;
                    }}
                    style={{ marginTop: 20 }}
                  >
                    <H4 underline align="left">
                      {title[0].toUpperCase() + title.slice(1)}
                    </H4>
                    <Chart
                      formatMessage={formatMessage}
                      currentTheme={currentTheme}
                      chartData={concept.chartData}
                      type={concept.type}
                      width={Dimensions.get('window').width - 40}
                      height={220}
                    />
                  </View>
                );
              })}
            </View>
          </Section>
        </NBContent>
      </App>
    );
  }
}

export default Analyze;
