import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
import Greetings from './Greetings'
import Rsvp from './Rsvp'
import Songs from './Songs'
import Photos from './Photos'

const Header = () => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <NavLink to='/' className='brand-logo'>WeddingAdmin</NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li><NavLink to='/greetings'>Greetings</NavLink></li>
          <li><NavLink to='/rsvp'>RSVP</NavLink></li>
          <li><NavLink to='/songs'>Songs</NavLink></li>
          <li><NavLink to='/photos'>Photos</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/greetings' exact component={Greetings} />
          <Route path='/rsvp' exact component={Rsvp} />
          <Route path='/songs' exact component={Songs} />
          <Route path='/photos' exact component={Photos} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
