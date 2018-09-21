import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLanguage } from '../actions';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


let i = 0;

class Header extends Component {

	componentDidMount() {
		M.Sidenav.init(document.querySelectorAll('.sidenav'));
	}

	onSelectFlag(countryCode) {
		this.props.fetchLanguage(countryCode);
	}

	render() {
		var items = [
			<li key={i++} >
				<Link className='sidenav-close yellow-text text-lighten-3 header-item' to='/'>
					{this.props.lang.header.home}
				</Link>
			</li>,
			<li key={i++}>
				<Link to="/rsvp" className='sidenav-close yellow-text text-lighten-3 header-item'>
					{this.props.lang.header.rsvp}
				</Link>
			</li>,
			<li key={i++}>
				<Link className='sidenav-close yellow-text text-lighten-3 header-item' to="/directions">
					{this.props.lang.header.directions}
				</Link>
			</li>,
			<li key={i++}>
				<Link className='sidenav-close yellow-text text-lighten-3 header-item' to="/songs">
					{this.props.lang.header.songs}
				</Link>
			</li>,
			<li key={i++}>
				<Link className='sidenav-close yellow-text text-lighten-3 header-item' to="/greetings">
					{this.props.lang.header.guestbook}
				</Link>
			</li>,
			<li key={i++}>
				<Link className='sidenav-close yellow-text text-lighten-3 header-item' to="/photos">
					{this.props.lang.header.photos}
				</Link>
			</li>
		];
		
		return (
			<div>
				<div className='right' style={{ width: '60px' }}>
					<ReactFlagsSelect
						className='yellow-text text-lighten-3'
						countries={[ "BR", "CO" ]}
						defaultCountry='BR' 
						showSelectedLabel={false} 
						showOptionLabel={false}
						onSelect={this.onSelectFlag.bind(this)} />
				</div>
				<nav className='nav-center transparent z-depth-0'>
					<div className="nav-wrapper center">
						<a href='' data-target="mobile-nav" className="sidenav-trigger">
							<i className="material-icons yellow-text text-lighten-3">
								menu
							</i>
						</a>
						<ul className="hide-on-med-and-down">
							{items}
						</ul>
					</div>
				</nav>
			
				<ul className="sidenav bg-main" id="mobile-nav">
					{items}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

Header = connect(mapStateToProps, { fetchLanguage })(Header);

export default Header;