import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cover from '../images/home.jpg';

const calendarTemplate = 'https://calendar.google.com/'

class Home extends Component {
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
              <span className='card-title home-title'>
                {this.props.lang.home.title}
              </span>
              <p>{this.props.lang.home.date}</p>
            </div>
            <div className='card-action'>
              <Link to='/rsvp'>{this.props.lang.header.rsvp}</Link>
              <a 
                target="_blank"
                rel="noopener noreferrer" 
                href={calendarTemplate}
              >
                Google Calendar
              </a>
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

Home = connect(mapStateToProps)(Home);

export default Home;