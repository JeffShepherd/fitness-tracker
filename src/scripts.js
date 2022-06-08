
import './css/reset.css'
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import {userDataAPICall,hydrationDataAPICall, sleepDataAPICall} from './apiCalls'
import User from './User';
import UserRepository from './UserRepository';
import Hydration from './Hydration';
import Sleep from './Sleep';

const userName = document.getElementById('user-name')
const userAddressOne = document.getElementById('user-address-one')
const userAddressTwo = document.getElementById('user-address-two')
const userEmail = document.getElementById('user-email')
const userStrideLength = document.getElementById('user-strideLength')
const userDailyStepGoal = document.getElementById('user-dailyStepGoal')
const userCardBottomSection = document.getElementById('user-info-card-bottom-section')
const headerUserName = document.getElementById('header-user-name')
const dailyStepGoal = document.getElementById('user-daily-step-goal')
const averageDailyStepGoal = document.getElementById('average-daily-step-goal')
const todayHydrationData = document.getElementById('today-hydration-data')
const sevenDaysHydration= document.getElementById('seven-days-hydration')
const lastDaySleepQuality = document.getElementById('last-day-sleep-quality')
const lastDaySleepHours = document.getElementById('last-day-sleep-hours')
const userAverageQuality = document.getElementById('user-average-quality')
const userAverageHours = document.getElementById('user-average-hours')
const sevenDaysSleepHours = document.getElementById('seven-days-sleep-hours')
const sevenDaysSleepQuality = document.getElementById('seven-days-sleep-quality')

let userRepository, currentUser, hydrationRepo, sleepRepo;

window.addEventListener('load', getAllUserInfo)

function getAllUserInfo() {
  Promise.all([userDataAPICall, hydrationDataAPICall,sleepDataAPICall])
    .then(data => populateInfoOnLoad(data[0].userData,data[1].hydrationData,data[2].sleepData))
}

function populateInfoOnLoad(userData, hydrationData, sleepData) {
  userRepository = new UserRepository(userData)
  currentUser = new User(userData[0])
  hydrationRepo = new Hydration(hydrationData)
  sleepRepo = new Sleep(sleepData)
  populateCurrentUserCard()
  headerUserName.innerText = `Welcome back, ${currentUser.provideFirstName()}!`
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g,'/')
  populateStepGoalCard()
  populateHydrationCard(currentDate)
  populateSleepCard(currentDate)
}

function populateSleepCard(currentDate) {
  const dailyQualityData = sleepRepo.getDailySleepQuality(currentDate, currentUser.id)
  const dailyHourData = sleepRepo.getDailyHoursSlept(currentDate, currentUser.id)

  if(dailyQualityData) {lastDaySleepQuality.innerText = dailyQualityData} 
  else {lastDaySleepQuality.innerText = 'no data'}
  if(dailyHourData) {lastDaySleepHours.innerText = dailyHourData} 
  else {lastDaySleepHours.innerText = 'no data'}

  userAverageQuality.innerText = sleepRepo.getAverageSleepQuality(currentUser.id)
  userAverageHours.innerText = sleepRepo.getAverageHoursOfSleep(currentUser.id)
  populateSevenDaysSleepSection()
}

function populateSevenDaysSleepSection() {
  const sevenDaysSleepDisplay = sleepRepo.getPriorSevenDays(currentUser.id)
  sevenDaysSleepDisplay.forEach(entry => {
    sevenDaysSleepHours.innerHTML +=
    `<div>
      <p>${entry.hoursSlept}</p>
      <p>${entry.date}</p>
    </div>`
    sevenDaysSleepQuality.innerHTML +=
    `<div>
      <p>${entry.sleepQuality}</p>
      <p>${entry.date}</p>
    </div>`
  })
}

function populateHydrationCard(currentDate) {
  const data = hydrationRepo.getDailyHydration(currentDate, currentUser.id)
  if(data) {
    todayHydrationData.innerText = data
  } else {
    todayHydrationData.innerText = 'no data'
  }
  addWeeklyHydrationContent()
}

function addWeeklyHydrationContent() {
  const lastWeekData = hydrationRepo.getPriorSevenDays(currentUser.id)
  let lastWeekDisplay =''
  lastWeekData.forEach(entry => {
    lastWeekDisplay +=
    `<div>
      <p>${entry.date}</p>
      <p>${entry.numOunces}</p>
    </div>`
  })
  sevenDaysHydration.innerHTML = lastWeekDisplay
}

function populateStepGoalCard() {
  dailyStepGoal.innerText = `You: ${currentUser.dailyStepGoal}`
  averageDailyStepGoal.innerText = `All users average: ${userRepository.findAverageDailyStepGoal()}`
}

function populateCurrentUserCard() {
  const splitAddressLines = currentUser.address.split(',')
  userAddressOne.innerText = splitAddressLines[0]
  userAddressTwo.innerText = splitAddressLines[1]
  userName.innerText = currentUser.name
  userEmail.innerText = currentUser.email
  userStrideLength.innerText = `stride length: ${currentUser.strideLength}ft`
  userDailyStepGoal.innerText = `daily step goal: ${currentUser.dailyStepGoal}`
  addFriendsToCard()
}

function addFriendsToCard() {
  let friendInfo = userRepository.returnFriendInfo(currentUser.friends)
  let friendDisplay = ''
  friendInfo.forEach(friend => friendDisplay += `<p>${friend.name}</p>`)
  userCardBottomSection.innerHTML = friendDisplay
}





