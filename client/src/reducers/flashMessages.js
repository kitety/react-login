import { ADD_FLASH_MESSAGE, DEKETE_FLASH_MESSAGE } from '../constants'
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'

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
    case DEKETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: actions.id })
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      }
      break;
    default:
      return state;
  }
}
export default flashMessages;
