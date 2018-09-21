import axios from 'axios'
import M from 'materialize-css'
import * as types from './types'

export const fetchGreetings = () => async dispatch => {
  const res = await axios.get('/api/greetings')
  dispatch({ type: types.FETCH_GREETINGS, data: res.data })
}

export const deleteGreetings = (id) => async dispatch => {
  const res = await axios.delete(`/api/greetings/${id}`)
  if (res.data === 'Success') {
    M.toast({ html: 'Removido com sucesso'})
    dispatch(fetchGreetings())
  } else {
    M.toast({ html: 'Falha ao remover' })
  }
}

export const fetchRsvps = () => async dispatch => {
  const res = await axios.get('/api/rsvp')
  dispatch({ type: types.FETCH_RSVPS, data: res.data })
}

export const deleteRsvp = id => async dispatch => {
  const res = await axios.delete(`/api/rsvp/${id}`)
  if (res.data === 'Success') {
    M.toast({ html: 'Removido com sucesso' })
    dispatch(fetchRsvps())
  } else {
    M.toast('Falha ao remover')
  }
}

export const fetchSongs = () => async dispatch => {
  const res = await axios.get('/api/song')
  dispatch({ type: types.FETCH_SONGS, data: res.data })
}

export const deleteSong = id => async dispatch => {
  const res = await axios.delete(`/api/song/${id}`)
  if (res.data === 'Success') {
    M.toast({ html: 'Removido com sucesso' })
    dispatch(fetchSongs())
  } else {
    M.toast('Falha ao remover')
  }
}

export const fetchPhotos = () => async dispatch => {
  const res = await axios.get('/api/photos')
  dispatch({ type: types.FETCH_PHOTOS, data: res.data })
}

export const updatePhoto = (photo) => async dispatch => {
  const res = await axios.put('/api/photos', photo)
  if (res.data === 'Success') {
    M.toast({ html: 'Foto atualizada com sucesso' })
    dispatch(fetchPhotos())
  } else {
    M.toast({ html: 'Falha ao atualizar a foto' })
  }
}