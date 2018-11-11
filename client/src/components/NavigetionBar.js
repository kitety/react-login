import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigetionBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">React-login</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/signup">Sign up <span className="sr-only">(current)</span></Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

    );
  }
}

export default NavigetionBar
