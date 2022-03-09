const chartTypes = [
  'line-chart',
  'bar-chart',
  'progress-chart',
  'stackedbar-chart'
];

const generateFakeChartData = type => {
  if (type === 'line-chart') {
    return {
      labels: ['one', 'two', 'three', 'four', 'five'],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    };
  }

  if (type === 'stackedbar-chart') {
    return {
      labels: ['Test1', 'Test2'],
      legend: ['L1', 'L2', 'L3'],
      data: [
        [6, 6, 6],
        [3, 3, 0]
      ],
      barColors: ['#dfe4ea', '#ced6e0', '#a4b0be']
    };
  }

  if (type === 'progress-chart') {
    return {
      labels: ['Swim', 'Bike', 'Run'],
      data: [0.4, 0.6, 0.8]
    };
  }

  return {
    labels: ['one', 'two', 'three', 'four', 'five'],
    datasets: [
      {
        data: [20, 45, 28, 80, 9]
      }
    ]
  };
};

export const convertDataToChartModels = cKeys => {
  let i = 0;
  const newKeys = cKeys.map(k => {
    const index = i % 4;
    const data = generateFakeChartData(chartTypes[index]);
    i += 1;
    return {
      type: chartTypes[index],
      name: k,
      chartData: data
    };
  });
  return newKeys;
};
