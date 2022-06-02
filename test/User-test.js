import { expect } from 'chai';
import User from '../src/User';
import userData from '../src/data/users'

describe('User', () => {
  let testUser = new User(userData[0])

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should have an id', function () {
    expect(testUser.id).to.equal(1);
  });

  it('should have a name', function () {
    expect(testUser.name).to.equal('Luisa Hane');
  });

  it('should have an address', function () {
    expect(testUser.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('should have an email', function () {
    expect(testUser.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('should have a stride length', function () {
    expect(testUser.strideLength).to.equal(4.3);
  });

  it('should have a daily step goal', function () {
    expect(testUser.dailyStepGoal).to.equal(10000);
  });

  it('should have a list of friends', function () {
    expect(testUser.friends[1]).to.equal(4);
  });

  it('should be able to return the user\'s first name', function () {
    expect(testUser.provideFirstName()).to.equal('Luisa');
  });

});