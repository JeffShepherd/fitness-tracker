import { expect } from 'chai';
import Sleep from '../src/Sleep';
import {sleepTestData} from '../src/data/testData'

describe('Sleep', () => {
  let testSleep = new Sleep(sleepTestData)

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should return a user\'s average hours of sleep for all time', function () {
    expect(testSleep.getAverageHoursOfSleep(1)).to.equal(5);
    expect(testSleep.getAverageHoursOfSleep(2)).to.equal(8);
  });

  it('should return a user\'s average sleep quality for all time', function () {
    expect(testSleep.getAverageSleepQuality(1)).to.equal(2);
    expect(testSleep.getAverageSleepQuality(2)).to.equal(4);
  });

  it('should return a user\'s daily hours slept', function () {
    expect(testSleep.getDailyHoursSlept('2019/06/15',1)).to.equal(6);
    expect(testSleep.getDailyHoursSlept('2019/07/15',1)).to.equal(9);
  });

  it('should return a user\'s daily sleep quality', function () {
    expect(testSleep.getDailySleepQuality('2019/06/15',1)).to.equal(2);
    expect(testSleep.getDailySleepQuality('2019/07/15',1)).to.equal(2);
  });

  it('should return a user\'s hours slept for the last seven days', function () {
    const lastSevenDays = testSleep.getPriorSevenDays(7)
    expect(lastSevenDays).to.be.an('array');
    expect(lastSevenDays.length).to.equal(7);
    expect(lastSevenDays[0].userID).to.equal(7);
    expect(lastSevenDays[6].date).to.equal('2021/06/15');
  });


  
});