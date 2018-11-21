import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessage'


export default function (ComposedConponent) {
  class Authenticate extends Component {
    // 生命周期函数的利用
    componentWillMount() {
      //未登陆
      if (!this.props.isAuthorization) {
        // 添加提示
        this.props.addFlashMessage({
          type: 'danger',
          text: 'You need to login to access this page'
        })
        this.context.router.history.push('/')
      }
    }
    componentWillUpdate(nextProps){
      if (!nextProps.isAuthorization) {
        this.context.router.history.push('/')
      }
    }
    render() {
      return (
        // {/* 高阶组件 */}
        <ComposedConponent  {...this.props} />
      );
    }
  }
  Authenticate.propTypes = {
    isAuthorization: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }
  const mapStateToProps = (state) => {
    console.dir(state)
    return {
      isAuthorization: state.auth.isAuthorization
    }
  }
  return connect(mapStateToProps, { addFlashMessage })(Authenticate);

}
