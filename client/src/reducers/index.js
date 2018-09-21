import { combineReducers } from 'redux';
import GreetingReducer from './GreetingsReducer';
import { reducer as reduxForm } from 'redux-form';
import PhotosReducer from './PhotosReducer';
import LanguageReducer from './LanguageReducer';

export default combineReducers({
  form: reduxForm,
  greetings: GreetingReducer,
  photos: PhotosReducer,
  lang: LanguageReducer
});