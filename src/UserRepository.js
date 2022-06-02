import User from "./User";

class UserRepository {
  constructor(data) {
    this.userRepo = data.map(user => new User(user))
  }
}

export default UserRepository;