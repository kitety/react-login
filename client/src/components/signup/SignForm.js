import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
// 新的方法1
import {withRouter} from 'react-router-dom'
class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: '',
      isLoading: false
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }
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
        // Fthis.props.history.push('/')
      this.context.router.history.push('/')
    },
      ({ response }) => { this.setState({ errors: response.data, isLoading: false }) }
    )
  }
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired
  };
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
          <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}> Sign Up</button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignForm);
;
