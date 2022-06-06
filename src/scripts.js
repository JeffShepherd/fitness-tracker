
import './css/reset.css'
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import {userDataAPICall,hydrationDataAPICall} from './apiCalls'
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


let userRepository, currentUser, hydrationRepo;

window.addEventListener('load', getAllUserInfo)

function getAllUserInfo() {
  Promise.all([userDataAPICall, hydrationDataAPICall])
    .then(data => populateInfoOnLoad(data[0].userData,data[1].hydrationData))
}

function populateInfoOnLoad(userData, hydrationData) {
  userRepository = new UserRepository(userData)
  currentUser = new User(userData[0])
  hydrationRepo = new Hydration(hydrationData)
  populateCurrentUserCard()
  headerUserName.innerText = `Welcome back, ${currentUser.provideFirstName()}!`
  populateStepGoalCard()
  populateHydrationCard()
}

function populateHydrationCard() {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g,'/')
  const data = hydrationRepo.getDailyHydration(currentDate, currentUser.id)
  if(data) {
    todayHydrationData.innerText = data
  } else {
    todayHydrationData.innerText = 'No data has been logged for today'
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





