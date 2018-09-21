import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { submitSong } from '../actions';
import cover from '../images/songs.jpg';
import SuggestSongForm from './SuggestSongForm';

class SuggestSong extends Component {

  submit = async (values) => {
    for(var key in values) {
      if(values.hasOwnProperty(key)) {
        values[key] = values[key].trim();
      }
    }
    var res = await this.props.submitSong(values);
    if (res === 'SUCCESS') {
      M.toast({ 
        html: this.props.lang.songs.submitSuccess,
        classes: 'green lighten-3 green-text text-darken-4' 
      });
    }
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
                {this.props.lang.songs.title}
              </span>
              <SuggestSongForm onSubmit={this.submit} />
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

SuggestSong = connect(mapStateToProps, { submitSong })(SuggestSong);

export default SuggestSong;