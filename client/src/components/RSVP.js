import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitRsvp } from '../actions';
import M from 'materialize-css';
import cover from '../images/rsvp.jpg';
import RSVPForm from './RSVP-form';

class RSVP extends Component {

  submit = async (values) => {
    if (values.rsvp === 'true') {
      values.rsvp = true;
      if (values.guests) {
        values.guests = 
          values.guests.filter(guest => {
            return (guest && guest.name.trim() !== '')
          });
        values.guests.forEach(guest => {
          guest.name = guest.name.trim()
        });
      }
    } else {
      values.rsvp = false;
      delete values.guests;
    }

    values.name = values.name.trim();
    values.email = values.email.trim();

    var res = await this.props.submitRsvp(values);
    if (res === 'SUCCESS') {
      M.toast({ 
        html: this.props.lang.rsvp.submitSuccess,
        classes: 'green lighten-3 green-text text-darken-4'
      });
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='container center'>
        <img
          id='cover'
          className='circle responsive-img' 
          alt=''
          src={cover} 
        />
        <div className='container'>
          <div className='card indigo darken-3'>
            <div className='card-content yellow-text text-lighten-3'>
              <span className='card-title session-title'>
                {this.props.lang.rsvp.title}
              </span>
              <RSVPForm onSubmit={this.submit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

RSVP = withRouter(RSVP);

export default connect(mapStateToProps, { submitRsvp })(RSVP);