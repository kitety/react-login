import React, { Component } from 'react';
import { connect } from 'react-redux'
import SignForm from './SignForm'
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/signActions'


class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <SignForm userSignupRequest={this.props.userSignupRequest} history={this.props.history}/>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
export default connect(null, { userSignupRequest })(SignupPage)
