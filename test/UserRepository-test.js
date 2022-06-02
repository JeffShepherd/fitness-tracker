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
  
  it('should return average daily step goal for all users', function () {
    expect(testUserRepo.findAverageDailyStepGoal()).to.equal(6667);
  });

  it('should return user details for a specific id', function () {
    expect(testUserRepo.returnUserData(2)).to.be.an('object');
    expect(testUserRepo.returnUserData(3).strideLength).to.equal(4.4);
  });

  it('should return friend\'s details based on an array of IDs', function () {
    const ids = [2,3]
    const ids2 = [1]
    expect(testUserRepo.returnFriendInfo(ids)).to.be.an('array');
    expect(testUserRepo.returnFriendInfo(ids)[0].id).equal(2);
    expect(testUserRepo.returnFriendInfo(ids)[1].id).equal(3);
    expect(testUserRepo.returnFriendInfo(ids2)[0].name).equal('Luisa Hane');
  });

});