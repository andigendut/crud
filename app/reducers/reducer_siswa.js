import _ from 'lodash'
import { ADD_SISWA, UPDATE_SISWA, DELETE_SISWA } from '../actions'

const initialState = [
]

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_SISWA:
      const newSiswa = Object.assign({}, { id: state.length }, action.payload)
      const newState = [newSiswa, ...state]
      return newState

    case UPDATE_SISWA:
      const newArray = _.remove(state, (data) => {
        return data.id != action.payload.id
      })
      const updatedSiswa = Object.assign({}, { id: newArray.length }, action.payload)
      const updatedState = [updatedSiswa, ...newArray]
      return updatedState

    case DELETE_SISWA:
      console.log('get request')
      console.log(action.payload)
      const deletedNewArray = _.remove(state, (data) => {
        return data.id != action.payload
      })
      return deletedNewArray

    default:
      return state
  }
}
