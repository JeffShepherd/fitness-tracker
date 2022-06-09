import Chart from 'chart.js/auto';


const chart = {
  makeSevenDayChart(element,dataSet, propertyName,label) {
    new Chart(element, {
      type: 'line',
      data: {
        labels: dataSet.map(data => data.date),
        datasets: [{
          label: label,
          data: dataSet.map(data => data[propertyName])
        }]
      },
      options:[]
    })
  },

  makeComparisonBarChar(element, userData, averageData, label) {
    new Chart(element, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'you',
          data: [userData]
        },
        {
          label: 'national average',
          data: [averageData]
        }
      ]
      },
      options:[]
    })
  }
}



export default chart;