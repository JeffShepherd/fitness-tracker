
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
    return dailyHydration.numOunces
  }

}

export default Hydration;