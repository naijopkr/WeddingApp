import { FETCH_GREETINGS } from '../actions/types';

export default 
  (state = [], action) => {
    switch(action.type) {
      case FETCH_GREETINGS:
        return action.data;
      default:
        return state;
    }
  }