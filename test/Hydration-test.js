import { expect } from 'chai';
import Hydration from '../src/Hydration';
import {hydrationTestData} from '../src/data/testData'

describe('Hydration', () => {
  let testHydration = new Hydration(hydrationTestData)

  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });

  it('should have all user\'s hydration data', function () {
    expect(testHydration.hydrationData.length).to.equal(12);
    expect(testHydration.hydrationData[2].userID).to.equal(5);
    expect(testHydration.hydrationData[6].numOunces).to.equal(47);
  });


});