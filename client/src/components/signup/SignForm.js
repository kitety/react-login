import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
// 新的方法1
import { withRouter } from 'react-router-dom'
class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {},
      isLoading: false,
      invalidUsername: false,
      invalidEmail: false
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUsernameExists: PropTypes.func.isRequired,
    isEmailExists: PropTypes.func.isRequired
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    e.preventDefault();
    // 不要在这里直接请求 在栽面统一管理
    // axios.post('/api/post', { users: this.state })
    this.setState({ errors: '', isLoading: true })
    this.props.userSignupRequest(this.state).then(
      () => {
        // this.props.history.push('/')
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed successfully! Welcome!'
        })
        this.context.router.history.push('/')
      },
      ({ response }) => { this.setState({ errors: response.data, isLoading: false }) }
    )
  }
  checkUsernameExists = e => {
    let val = e.target.value;
    let field = e.target.name;
    console.dir(e.target)
    if (val !== "") {
      this.props.isUsernameExists(val).then(res => {
        let { errors, invalidUsername } = this.state
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field
          invalidUsername = true
        } else {
          errors[field] = ''
          invalidUsername = false
        }
        this.setState({ errors, invalidUsername })
      })
    }
  }
  checkEmailExists = e => {
    let val = e.target.value;
    let field = e.target.name;
    console.dir(e.target)
    if (val !== "") {
      this.props.isEmailExists(val).then(res => {
        let { errors, invalidEmail } = this.state
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field
          invalidEmail = true
        } else {
          errors[field] = ''
          invalidEmail = false
        }
        this.setState({ errors, invalidEmail })
      })
    }
  }
  render() {
    const { errors } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            onBlur={this.checkUsernameExists}
            className={classnames("form-control", { "is-invalid": errors.username })}
          />
          {errors.username && <span className="form-text text-muted">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="email"
            name="email"
            onBlur={this.checkEmailExists}
            className={classnames("form-control", { "is-invalid": errors.email })}

          />
          {errors.email && <span className="form-text text-muted">{errors.email}</span>}

        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className={classnames("form-control", { "is-invalid": errors.password })}

          />
          {errors.password && <span className="form-text text-muted">{errors.password}</span>}

        </div>
        <div className="form-group">
          <label className="control-label">Confirm</label>
          <input
            value={this.state.passwordConfirm}
            onChange={this.onChange}
            type="password"
            name="passwordConfirm"
            className={classnames("form-control", { "is-invalid": errors.passwordConfirm })}

          />
          {errors.passwordConfirm && <span className="form-text text-muted">{errors.passwordConfirm}</span>}

        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={this.state.isLoading || this.state.invalidEmail || this.state.invalidUsername}> Sign Up</button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignForm);
;
