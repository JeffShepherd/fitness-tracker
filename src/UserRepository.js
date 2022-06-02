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

  returnFriendInfo(ids) {
    return this.userRepo.filter(user => ids.includes(user.id))
  }

}

export default UserRepository;