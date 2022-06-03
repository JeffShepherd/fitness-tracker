// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS file
import './css/reset.css'
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');
// An example of how you tell webpack to use a JS file
import userData from './data/users';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';


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

window.addEventListener('load', populateInfoOnLoad)


let userRepository = new UserRepository(userData)
let currentUser = new User(userData[0])

function populateInfoOnLoad() {
  populateCurrentUserCard()
  headerUserName.innerText = 
  `Welcome back, ${currentUser.provideFirstName()}!`
  populateStepGoalCard()
}

function populateStepGoalCard() {
  dailyStepGoal.innerText = `You: ${currentUser.dailyStepGoal}`
  averageDailyStepGoal.innerText = 
  `All users average: ${userRepository.findAverageDailyStepGoal()}`
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





