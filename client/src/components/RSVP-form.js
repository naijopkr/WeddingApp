import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import M from 'materialize-css';
import { connect } from 'react-redux';

class RSVPForm extends Component {
  constructor(props) {
    super(props);
    this.state = { rsvp: 'false' };
  }

  componentDidMount() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  renderFieldArray(rsvp) {
    if (rsvp === 'true') {
      return (
        <FieldArray name='guests' component={this.renderGuests.bind(this)} />
      );
    }
  }

  renderGuests({ fields }) {
    return (
      <div className='row'>
        {fields.map((guest, index) => {
          return (
            <div key={index} className='row no-margin'>
              <div className='input-field col s10'>
                <Field
                  className='yellow-text text-lighten-3' 
                  name={`${guest}.name`}
                  autoFocus
                  component='input' 
                  type='text' 
                  placeholder={this.props.lang.rsvp.guestName}
                />
              </div>
              <div className='input-field col s2'>
                <button
                  className='btn-flat btn-floating transparent'
                  type='button'
                  onClick={() => fields.remove(index)}
                >
                  <i className='material-icons yellow-text text-lighten-3'>
                    delete
                  </i>
                </button>
              </div>
            </div>
          );
        })}
        <div className='col s12'>
          <Field 
            name='addGuest'
            className='btn yellow-text text-lighten-3 bg-main'
            component='button' 
            type='button'
            readOnly 
            placeholder={this.props.lang.rsvp.addGuest}
            onClick={() => fields.push()}
          >
            {this.props.lang.rsvp.addGuest}
          </Field>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className='row no-margin'>
          <div className='input-field col s12 m6'>
            <Field
              name='name'
              component='input'
              type='text'
              id='name'
              required
              className='yellow-text text-lighten-3'
            />
            <label htmlFor='name'>
              {this.props.lang.rsvp.name}
            </label>
          </div>
          <div className='input-field col s12 m6'>
            <Field
              name='email'
              component='input'
              type='email'
              id='email'
              required
              className='yellow-text text-lighten-3'
            />
            <label htmlFor='email'>
              {this.props.lang.rsvp.email}
            </label>
          </div>
        </div>
        <div className='row no-margin'>
          <div className='input-field col s12 m4 offset-m4'>
          <p>{this.props.lang.rsvp.rsvpSelectTitle}</p>
          <Field
            component='select'
            name='rsvp'
            className='browser-default transparent yellow-text text-lighten-3'
            required
            onChange={async (event) => {
              await this.setState({ rsvp: event.target.value });
            }}
          >
            <option value='' disabled>{this.props.lang.rsvp.rsvpPlaceholder}</option>
            <option className='black-text' value={true}>{this.props.lang.rsvp.yes}</option>
            <option className='black-text' value={false}>{this.props.lang.rsvp.no}</option>
          </Field>
          </div>
          <div className='container'>
            {this.renderFieldArray(this.state.rsvp)}
          </div>
        </div>
        <div>
          <button type='submit' disabled={this.props.pristine || this.props.submitting}
            className='btn yellow-text text-lighten-3 bg-main'
          >
            {this.props.lang.submit}
            <i className='material-icons right'>send</i>
          </button>
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

RSVPForm = connect(mapStateToProps)(RSVPForm);

export default reduxForm({
  form: 'rsvpForm'
})(RSVPForm);