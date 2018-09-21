import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { submitGreetings, fetchGreetings } from '../actions';
import cover from '../images/guestbook.jpg';
import GreetingsForm from './GreetingsForm';

class Greetings extends Component {

  componentDidMount = () => {
    this.props.fetchGreetings();
  }

  submit = async (values) => {
    for(var key in values) {
      if(values.hasOwnProperty(key)) {
        values[key] = values[key].trim()
      }
    }
    var res = await this.props.submitGreetings(values);
    if (res === 'SUCCESS') {
      M.toast({ 
        html: this.props.lang.guestbook.submitSuccess,
        classes: 'green lighten-3 green-text text-darken-4' 
      });
    }
  }

  renderGreetings = () => {
    return (
      <div className='row'>
      {this.props.greetings.map(greeting => {
        return (
          <div key={greeting._id} className='col s12 m6'>
            <div className='card indigo darken-3'>
              <div className='card-content yellow-text text-lighten-3'>
                <span className='card-title'>
                  <i className="fas fa-quote-left"></i>
                </span>
                {greeting.message.split('\n').map((line, key) => {
                  return (<p key={key}>{line}</p>);
                })}
              </div>
              <div className='msg-sign'>
                {greeting.name}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    );
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
                {this.props.lang.guestbook.title}
              </span>
              <GreetingsForm onSubmit={this.submit} />
            </div>
          </div>
          {this.renderGreetings()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    greetings: state.greetings,
    lang: state.lang
  });
}

Greetings = connect(
  mapStateToProps, 
  { submitGreetings, fetchGreetings })(Greetings);

export default Greetings;