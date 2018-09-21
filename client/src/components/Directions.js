import React, { Component } from 'react';
import { connect } from 'react-redux'
import cover from '../images/directions.jpg';

var mapURI = 'https://www.google.com/maps/embed';

class Directions extends Component {
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
                {this.props.lang.directions.title}
              </span>
              <p>{this.props.lang.directions.directions}</p>
              <div className='video-container'>
                <iframe
                  title='map' 
                  src={mapURI} 
                  width="600" 
                  height="450" 
                  frameBorder="0" 
                  style={{ border: 0 }}
                  allowFullScreen>
                </iframe>
              </div>
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

export default connect(mapStateToProps)(Directions);