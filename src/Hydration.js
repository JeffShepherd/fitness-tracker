
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

}

export default Hydration;