import { combineReducers } from 'redux'
import SiswaReducer from './reducer_siswa'
import CurrentSiswaReducer from './reducer_current'

const rootReducer = combineReducers({
  allSiswa: SiswaReducer,
  currentSiswa: CurrentSiswaReducer
})

export default rootReducer
