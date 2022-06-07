import { expect } from 'chai';
import Sleep from '../src/Sleep';
import {sleepTestData} from '../src/data/testData'

describe('Sleep', () => {
  let testSleep = new Sleep(sleepTestData)

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should return a user\'s average hours of sleep', function () {
    expect(testSleep.getAverageHoursOfSleep(1)).to.equal(6);
    expect(testSleep.getAverageHoursOfSleep(2)).to.equal(8);
  });


});