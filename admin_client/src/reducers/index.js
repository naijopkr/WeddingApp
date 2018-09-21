import { combineReducers } from 'redux'
import * as reducers from './reducers'

export default combineReducers({
  greetings: reducers.Greetings,
  rsvps: reducers.Rsvps,
  songs: reducers.Songs,
  photos: reducers.Photos
})