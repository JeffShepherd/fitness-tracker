import Chart from 'chart.js/auto';

const chart = {
  makeSevenDayLineChart(element,dataSet) {
    new Chart(element, {
      type: 'line',
      data: {
        labels: dataSet.map(data => data.date),
        datasets: [{
          label: 'Num Ounces',
          data: dataSet.map(data => data.numOunces),
          borderColor: ['rgb(255,165,0,0.9)'],
          backgroundColor: ['rgb(255,165,0,0.9)']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Ounces Consumed for Last Week'
          },
          legend: {
            display: false
          }
        }
      }
    })
  },
  makeSleepLineChart(element,dataSet) {
    new Chart(element, {
      type: 'line',
      data: {
        labels: dataSet.map(data => data.date),
        datasets: [{
          label: 'hours slept',
          data: dataSet.map(data => data.hoursSlept),
          borderColor: ['rgb(255,165,0,0.9)'],
          backgroundColor: ['rgb(255,165,0,0.9)']
        },
        {
          label: 'sleep quality',
          data: dataSet.map(data => data.sleepQuality),
          borderColor: ['rgb(128,0,128,0.9)'],
          backgroundColor: ['rgb(128,0,128,0.9)']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Sleep Data for Last 7 Days'
          }
        }
      }
    })
  },

  makeStepBarChart(element, userData, averageData) {
    new Chart(element, {
      type: 'bar',
      data: {
        labels: ['you','all users average'],
        datasets: [{
          label: 'steps',
          data: [userData,averageData],
          backgroundColor: ['rgb(255,165,0,0.9)','rgb(128,0,128,0.9)']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Daily Step Goal'
          },
          legend: {
            display: false
          }
        }
      }
    })
  },

  makeSleepBarChart(element, data) {
    new Chart(element, {
      type: 'bar',
      data: {
        labels: ['hours slept','sleep quality'],
        datasets: [{
          label: 'last logged day',
          data: [data[0],data[2]],
          backgroundColor: ['rgb(255,165,0,0.9)','rgb(255,165,0,0.9)']
        },
        {
          label: 'your average',
          data: [data[1],data[3]],
          backgroundColor: ['rgb(128,0,128,0.9)','rgb(128,0,128,0.9)']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Sleep'
          }
        }
      }
    })
  }
}

export default chart;