import React, { Component } from 'react';
import classnames from 'classnames'
import { createEvent } from '../../actions/eventActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    }
  }
  static propTypes = {
    createEvent: PropTypes.func.isRequired
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.createEvent(this.state)
  }
  render() {
    const { title, errors, isLoading } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <h1>New Event</h1>
        <div className="form-group">
          <label className="control-label">Title</label>
          <input
            value={title}
            onChange={this.onChange}
            type="text"
            name="title"
            className={classnames("form-control", { "is-invalid": errors.title })}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-md" disabled={isLoading}>Create</button>
        </div>
      </form>
    );
  }
}

export default connect(null, { createEvent })(EventForm);
