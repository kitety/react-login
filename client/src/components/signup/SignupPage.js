import React, { Component } from 'react';
import { connect } from 'react-redux'
import SignForm from './SignForm'
import PropTypes from 'prop-types';
import { userSignupRequset } from '../../actions/signActions'


class SignupPage extends Component {
  static propTypes = {
    userSignupRequset: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <SignForm userSignupRequset={this.props.userSignupRequset} />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
export default connect(null, { userSignupRequset })(SignupPage)
