import { expect } from 'chai';
import Sleep from '../src/Sleep';
import {sleepTestData} from '../src/data/testData'

describe('Sleep', () => {
  let testSleep = new Sleep(sleepTestData)

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should return a user\'s average hours of sleep for all time', function () {
    expect(testSleep.getAverageHoursOfSleep(1)).to.equal(6);
    expect(testSleep.getAverageHoursOfSleep(2)).to.equal(8);
  });

  it('should return a user\'s average sleep quality for all time', function () {
    expect(testSleep.getAverageSleepQuality(1)).to.equal(2);
    expect(testSleep.getAverageSleepQuality(2)).to.equal(4);
  });

});