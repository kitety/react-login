import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'



class NavigetionBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }
  logout = e => {
    e.preventDefault();
    this.props.logout()
  }
  render() {
    const { isAuthorization } = this.props.auth
    const userLink = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/" onClick={this.logout}>Logout <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/new-event">New Event <span className="sr-only">(current)</span></a>
        </li>
      </ul>
    )
    const guestLink = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/signup">Sign up <span className="sr-only">(current)</span></Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">React-login</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            {isAuthorization ? userLink : guestLink}
          </div>
        </div>
      </nav>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { logout })(NavigetionBar)
