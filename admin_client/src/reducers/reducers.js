import * as types from '../actions/types'

export const Greetings = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GREETINGS:
      return action.data
    default:
      return state
  }
}

export const Rsvps = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_RSVPS:
      return action.data
    default:
      return state
  }
}

export const Songs = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_SONGS:
      return action.data
    default:
      return state
  }
}

export const Photos = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PHOTOS:
      return action.data
    default:
      return state
  }
}
