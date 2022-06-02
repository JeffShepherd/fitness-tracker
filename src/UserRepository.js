import User from "./User";

class UserRepository {
  constructor(data) {
    this.userRepo = data.map(user => new User(user))
  }

  findAverageDailyStepGoal() {
    const totalSteps = this.userRepo.reduce((steps, user) => {
      return steps += user.dailyStepGoal
    },0)
    return Math.round(totalSteps /this.userRepo.length)
  }

  returnUserData(id) {
    return this.userRepo.find(user => user.id === id)
  }

}

export default UserRepository;