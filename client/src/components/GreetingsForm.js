import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class GreetingsForm extends Component {
  
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
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
            <label htmlFor='name'>{this.props.lang.guestbook.name}</label>
          </div>
        </div>
        <div className='row no-magin'>
          <div className='input-field col s12'>
            <Field 
              name='message'
              id='message'
              component='textarea'
              type='text'
              required
              className='materialize-textarea yellow-text text-lighten-3'
            />
            <label htmlFor='message'>{this.props.lang.guestbook.message}</label>
          </div>
        </div>
        <div className='row no-magin'>
          <div className='input-field col s12'>
            <button type='submit' disabled={pristine || submitting}
              className='btn yellow-text text-lighten-3 bg-main'
            >
              Enviar
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return ({
    lang: state.lang
  });
}

GreetingsForm = connect(mapStateToProps)(GreetingsForm);

export default reduxForm({
  form: 'greetingsForm'
})(GreetingsForm);