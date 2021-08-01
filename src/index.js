import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// redux-thunk
import thunk from 'redux-thunk';
// Reducers
import authReducer from './store/reducer/auth';
import beatsReducer from './store/reducer/beats';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  beats: beatsReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
