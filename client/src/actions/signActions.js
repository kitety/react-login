import axios from 'axios'

export const userSignupRequset = (userData) => {
  return dispatch=>{
    return axios.post('/api/user',userData)
  }
}

