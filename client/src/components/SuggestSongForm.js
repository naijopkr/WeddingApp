import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class SuggestSongForm extends Component {

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className='row no-margin'>
          <div className='input-field col s12'>
            <Field
              name='name'
              id='name'
              component='input'
              type='text'
              required
              className='yellow-text text-lighten-3'
            />
            <label htmlFor='name'>{this.props.lang.songs.name}</label>
          </div>
        </div>
        <div className='row no-margin'>
          <div className='input-field col s12 m6'>
            <Field
              name='artist'
              id='artist'
              component='input'
              type='text'
              required
              className='yellow-text text-lighten-3'
            />
            <label htmlFor='artist'>{this.props.lang.songs.artist}</label>
          </div>
          <div className='input-field col s12 m6'>
            <Field
              name='song'
              id='song'
              component='input'
              type='text'
              required
              className='yellow-text text-lighten-3'
            />
            <label htmlFor='song'>{this.props.lang.songs.song}</label>
          </div>
        </div>
        <div className='row no-magin'>
          <div className='input-field col s12'>
            <button type='submit' disabled={pristine || submitting}
              className='btn yellow-text text-lighten-3 bg-main'
            >
              {this.props.lang.submit}
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </div>
      </form>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

SuggestSongForm = connect(mapStateToProps)(SuggestSongForm);

export default reduxForm({
  form: 'suggestSong'
})(SuggestSongForm);