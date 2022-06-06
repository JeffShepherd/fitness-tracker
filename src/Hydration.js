
class Hydration {
  constructor(data) {
    this.hydrationData = data
  }

  getAverageFlOunces(id) {
    const totalOuncesWithDays = this.hydrationData.reduce((ounces,entry) => {
      if(entry.userID === id) {
        ounces[0] += entry.numOunces
        ounces[1] ++
      }
      return ounces
    },[0,0])
    return Math.round(totalOuncesWithDays[0] / totalOuncesWithDays[1])
  }

  getDailyHydration(date, id) {
    const dailyHydration = this.hydrationData.find(entry => 
      entry.date === date && entry.userID === id)
    if(!dailyHydration) {
      return false
    } else {
      return dailyHydration.numOunces
    }
  }

  getPriorSevenDays(id) {
    let lastWeekOfData = this.hydrationData.filter(entry => entry.userID === id)
    lastWeekOfData.sort(
      (a,b) => parseInt(a.date.replaceAll('/','')) - parseInt(b.date.replaceAll('/',''))
    )
    return lastWeekOfData.slice(lastWeekOfData.length-7,lastWeekOfData.length)
  }

}

export default Hydration;