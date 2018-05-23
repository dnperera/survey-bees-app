import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google </a>
					</li>
				);
			default:
				return (
					<li>
						<a href="/api/logout">Log Out</a>
					</li>
				);
		}
	}

	render() {
		console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
						SurveyBees
					</Link>

					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

//ES6 version
function mapStateToProps({ auth }) {
	return { auth };
}
// function mapStateToProps(state) {
// 	return {
// 		auth: state.auth,
// 	};
// }
export default connect(mapStateToProps)(Header);

/*
  <div class="nav-wrapper">
    <a href="#" class="brand-logo">Logo</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul>
  </div>
</nav>
 */
