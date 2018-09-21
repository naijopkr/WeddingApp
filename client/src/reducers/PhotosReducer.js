import { FETCH_PHOTOS } from '../actions/types';

export default 
  (state = [], action) => {
    switch(action.type) {
      case FETCH_PHOTOS:
        return action.data;
      default:
        return state;
    }
  }