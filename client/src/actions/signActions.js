import axios from 'axios'

export const userSignupRequest = (userData) => {
  return dispatch => {
    return axios.post('/api/user', userData)
  }
}
export const isUsernameExists = (identifier) => {
  return dispatch => {
    return axios.get(`/api/user/username/${identifier}`, identifier)
  }
}
export const isEmailExists = (identifier) => {
  return dispatch => {
    return axios.get(`/api/user/email/${identifier}`, identifier)
  }
}

