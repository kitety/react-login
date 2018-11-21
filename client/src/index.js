import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import RootReducer from './reducers'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import NavigetionBar from './components/NavigetionBar';
import { BrowserRouter as Router } from 'react-router-dom';
import routers from './routers'
import FlashMessageList from './components/flash/FlashMessageList'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions/authActions'
import jwtDecode from 'jwt-decode'



const store = createStore(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(logger, thunk)
  )
)
// console.log(store);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // store 里面调用dispatch
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        {/* 上面导航栏 下面组件.routers实际返回的是div */}
        <NavigetionBar />
        <FlashMessageList />
        {routers}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
