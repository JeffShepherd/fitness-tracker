
import './css/reset.css'
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import {userDataAPICall,hydrationDataAPICall, sleepDataAPICall} from './apiCalls'
import User from './User';
import UserRepository from './UserRepository';
import Hydration from './Hydration';
import Sleep from './Sleep';
import chart from './chartCreation'

const userName = document.getElementById('user-name')
const userAddressOne = document.getElementById('user-address-one')
const userAddressTwo = document.getElementById('user-address-two')
const userEmail = document.getElementById('user-email')
const userStrideLength = document.getElementById('user-strideLength')
const userCardBottomSection = document.getElementById('user-info-card-right-section')
const headerUserName = document.getElementById('header-user-name')
const todayHydrationData = document.getElementById('today-hydration-data')
const stepChart = document.getElementById('step-chart')
const sleepBarChart = document.getElementById('sleep-bar-chart')
const sleepLineChart = document.getElementById('sleep-line-chart')
const hydrationLineChart = document.getElementById('hydration-line-chart')

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

function populateSleepCard() {
  const sevenDaysData = formatDates(sleepRepo.getPriorSevenDays(currentUser.id))
  const data = [
    sevenDaysData[6].hoursSlept,
    sleepRepo.getAverageHoursOfSleep(currentUser.id),
    sevenDaysData[6].sleepQuality,
    sleepRepo.getAverageSleepQuality(currentUser.id)
  ]
  chart.makeSleepBarChart(sleepBarChart,data )
  chart.makeSleepLineChart(sleepLineChart,sevenDaysData)
}

function populateHydrationCard(currentDate) {
  const data = hydrationRepo.getDailyHydration(currentDate, currentUser.id)
  if(data) {
    todayHydrationData.innerText = data
  } else {
    todayHydrationData.innerText = 'no data'
  }
  let weekData = formatDates(hydrationRepo.getPriorSevenDays(currentUser.id))
  chart.makeSevenDayLineChart(hydrationLineChart,weekData)
}

function formatDates(arr) {
  arr.forEach(day=>{
    let breakdown =  day.date.split('/')
    breakdown[1] = parseInt(breakdown[1]).toString()
    breakdown[2] = parseInt(breakdown[2]).toString()
    breakdown[0] = breakdown[0].split('').splice(0,2).join('')
    day.date = [breakdown[1],breakdown[2],breakdown[0]].join('/')
  })
  return arr
}

function populateStepGoalCard() {
  userStrideLength.innerText = `stride length: ${currentUser.strideLength}ft`
  chart.makeStepBarChart(
    stepChart,
    currentUser.dailyStepGoal, 
    userRepository.findAverageDailyStepGoal()
  )
}

function populateCurrentUserCard() {
  const splitAddressLines = currentUser.address.split(',')
  userAddressOne.innerText = splitAddressLines[0]
  userAddressTwo.innerText = splitAddressLines[1]
  userName.innerText = currentUser.name
  userEmail.innerText = currentUser.email
  addFriendsToCard()
}

function addFriendsToCard() {
  let friendInfo = userRepository.returnFriendInfo(currentUser.friends)
  let friendDisplay = ''
  friendInfo.forEach(friend => friendDisplay += `<p>${friend.name}</p>`)
  userCardBottomSection.innerHTML = friendDisplay
}

