const checkIfError = response => {
  if (!response.ok) {
    throw new Error('An error has been encountered. Please try again.');
  } else {
    return response.json();
  }
}

export const userDataAPICall = fetch("https://fitlit-api.herokuapp.com/api/v1/users")
  .then(checkIfError)
  .catch(err => alert(err))

export const hydrationDataAPICall = fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
  .then(checkIfError)
  .catch(err => alert(err))

export const sleepDataAPICall = fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
  .then(checkIfError)
  .catch(err => alert(err))