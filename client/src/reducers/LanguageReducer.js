import { FETCH_LANGUAGE } from '../actions/types';

export default 
  (state = [], action) => {
    switch(action.type) {
      case FETCH_LANGUAGE:
        return action.data;
      default:
        return state;
    }
  }