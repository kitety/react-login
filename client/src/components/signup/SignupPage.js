import React, { Component } from 'react';
import { connect } from 'react-redux'
import SignForm from './SignForm'
import PropTypes from 'prop-types';
import { userSignupRequest, isUsernameExists, isEmailExists } from '../../actions/signActions'
import { addFlashMessage } from '../../actions/flashMessage'


class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUsernameExists: PropTypes.func.isRequired,
    isEmailExists: PropTypes.func.isRequired
  };
  render() {
    const { addFlashMessage, userSignupRequest, isUsernameExists, isEmailExists } = this.props
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {/* 路由跳转方法1省去了history={this.props.history}传值 */}
          <SignForm
            userSignupRequest={userSignupRequest}
            isUsernameExists={isUsernameExists}
            isEmailExists={isEmailExists}
            addFlashMessage={addFlashMessage} />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
export default connect(null, { userSignupRequest, addFlashMessage, isUsernameExists, isEmailExists })(SignupPage)
