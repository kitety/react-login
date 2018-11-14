import { ADD_FLASH_MESSAGE, DEKETE_FLASH_MESSAGE } from '../constants'
export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}
export const deleteFlashMessage = (id) => {
  return {
    type: DEKETE_FLASH_MESSAGE,
    id
  }
}
