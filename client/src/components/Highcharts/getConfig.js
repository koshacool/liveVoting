const getChartData = ({ title, votedBy }) => ({
  y: votedBy.length,
  name: title,
});

export const getChartConfig = (answers, colors) => ({
  chart: {
    backgroundColor: '#fafafa',
    type: 'pie',
  },

  colors,

  title: {
    text: 'Voting results',
  },

  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },

  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} % ({y})',
      },
    },
  },

  series: [
    {
      name: 'Answers',
      colorByPoint: true,
      data: answers.map(getChartData),
    }],
});
