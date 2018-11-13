import { ADD_FLASH_MESSAGE } from '../constants'
import shortid from 'shortid'
const flashMessages = (state = [], actions = {}) => {
  switch (actions.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: actions.message.type,
          text: actions.message.text
        }
      ]
    default:
      return state;
  }
}
export default flashMessages;
