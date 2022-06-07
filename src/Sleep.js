
class Sleep {
  constructor(data) {
    this.sleepData = data
  }

  getAverageHoursOfSleep(id) {
    let counter = 0
    const totalHours = this.sleepData.reduce((hours,entry) => {
      if(entry.userID === id) {
        hours += entry.hoursSlept
        counter++
      }
      return hours
    },0)
    return Math.round(totalHours/counter)
  }

  getAverageSleepQuality(id) {
    let counter = 0
    const totalQuality = this.sleepData.reduce((quality,entry) => {
      if(entry.userID === id) {
        quality += entry.sleepQuality
        counter++
      }
      return quality
    },0)
    return Math.round(totalQuality/counter)
  }

  getDailyHoursSlept(date,id) {
    const dailySleep = this.sleepData.find(entry => 
      entry.date === date && entry.userID === id)
    if(!dailySleep) {
      return false
    } else {
      return Math.round(dailySleep.hoursSlept)
    }  }


}

export default Sleep;