import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  LineChart,
  BarChart,
  ProgressChart,
  StackedBarChart
} from 'react-native-chart-kit';

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 16,
    marginVertical: 15
  }
});

const Chart = ({ chartData, type, width, height }, { currentTheme }) => {
  const chartConfig = {
    backgroundColor: currentTheme.COLORS.CHART_BG_COLOR,
    backgroundGradientFrom: currentTheme.COLORS.CHART_BG_GRADIENT_START,
    backgroundGradientTo: currentTheme.COLORS.CHART_BG_GRADIENT_END,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#00ff00'
    }
  };

  if (type === 'line-chart') {
    return (
      <LineChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={styles.chartContainer}
      />
    );
  }
  if (type === 'stackedbar-chart') {
    return (
      <StackedBarChart
        style={styles.chartContainer}
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfig}
      />
    );
  }
  if (type === 'progress-chart') {
    return (
      <ProgressChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    );
  }

  return (
    <BarChart
      data={chartData}
      width={width}
      height={height}
      chartConfig={chartConfig}
      style={styles.chartContainer}
      accessor="population"
    />
  );
};

Chart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.array
  }).isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

Chart.defaultProps = {
  height: 220,
  width: '100%'
};

Chart.contextTypes = {
  currentTheme: PropTypes.shape()
};

export default Chart;
