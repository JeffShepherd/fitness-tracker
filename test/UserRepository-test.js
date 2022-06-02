import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import userData from '../src/data/users'

describe('User Repository', () => {
  const testData = userData.slice(0,3)
  const testUserRepo = new UserRepository(testData)

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should have an array of users', function () {
    expect(testUserRepo.userRepo).to.be.an('array');
  });

  it('should have users in repo as objects', function () {
    expect(testUserRepo.userRepo[0]).to.be.an('object');
  });

  it('users should have properties of User class', function () {
    expect(testUserRepo.userRepo[2].name).to.equal('Herminia Witting');
    expect(testUserRepo.userRepo[2].id).to.equal(3);
    expect(testUserRepo.userRepo[2].friends.length).to.equal(4);
  });
  
  it('should be able to return average daily step goal for all users', function () {
    expect(testUserRepo.findAverageDailyStepGoal()).to.equal(6667);
  });

  it('should be able to return user details for a specific id', function () {
    expect(testUserRepo.returnUserData(2)).to.be.an('object');
    expect(testUserRepo.returnUserData(3).strideLength).to.equal(4.4);
  });

});