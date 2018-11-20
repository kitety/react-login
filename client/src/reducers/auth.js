import { SET_CURRENT_USER } from '../constants'
import isEmpty from 'lodash/isEmpty'
const initialState = {
  isAuthorization: false,
  user: {}
}
const auth = (state = initialState, actions = {}) => {
  switch (actions.type) {
    case SET_CURRENT_USER:
      return {
        isAuthorization: !isEmpty(actions.user),
        user: actions.user
      }
    default:
      return state;
  }
}
export default auth;
