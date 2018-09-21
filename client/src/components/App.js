import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLanguage } from '../actions';
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header';
import Home from './Home';
import RSVP from './RSVP';
import Directions from './Directions';
import SuggestSong from './SuggestSong';
import Greetings from   './Greetings';
import Photos from './Photos';

class App extends Component {
  componentWillMount() {
    this.props.fetchLanguage('BR');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/rsvp' component={RSVP} />
          <Route exact path='/directions' component={Directions} />
          <Route exact path='/songs' component={SuggestSong} />
          <Route exact path='/greetings' component={Greetings} />
          <Route exact path='/photos' component={Photos} />
        </div>
      </BrowserRouter>
    );
  }
}

App = connect(null, { fetchLanguage })(App);

export default App;
