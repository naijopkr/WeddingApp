import * as type from './types';
import axios from 'axios';
import { reset } from 'redux-form';
import en_us from '../translation/en-us';

export const submitRsvp = (values) => async () => {
  const res = await axios.post('/api/rsvp', values);
  return res.data;
}

export const submitSong = values => async dispatch => {
  const res = await axios.post('/api/songs', values);
  dispatch(reset('suggestSong'));
  return res.data;
}

export const submitGreetings = values => async dispatch => {
  const res = await axios.post('/api/greetings', values);
  dispatch(reset('greetingsForm'));
  dispatch({ type: type.FETCH_GREETINGS, data: res.data });
  if (res.status === 200) {
    return 'SUCCESS';
  }
}

export const fetchGreetings = () => async dispatch => {
  const res = await axios.get('/api/greetings');
  dispatch({ type: type.FETCH_GREETINGS, data: res.data });
}

export const fetchPhotos = () => async dispatch => {
  const res = await axios.get('/api/photos');
  dispatch({ type: type.FETCH_PHOTOS, data: res.data });
}

export const fetchLanguage = language => dispatch => {
  let lang;
  switch (language) {
    case 'ES':
      //lang = es
      break;
    case 'PT':
      //lang = pt
      break;
    default:
      lang = en_us;
  }
  dispatch({ type: type.FETCH_LANGUAGE, data: lang })
}