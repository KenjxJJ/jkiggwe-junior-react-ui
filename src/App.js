import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryComponent from './components/Category';
import NavBarComponent from './components/NavBar';
import ProductComponent from './components/Product'; import CartComponent from './components/Cart';

// Redux Store Config
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import allReducers from "./reducers";
import logger from "redux-logger";
import thunk from 'redux-thunk';


export default class App extends Component {

  render() {
    let middlewareList;

    if (process.env.REACT_APP_ENVIRONMENT !== "production") {
      middlewareList = [thunk, logger];
    } else {
      middlewareList = [thunk];
    }

    let store = createStore(allReducers, applyMiddleware(...middlewareList));

    return (
      <>
        <Provider store={store}>
          <NavBarComponent />
          <Router>
            <Routes>
              <Route element={<CategoryComponent />} path="/" />
              <Route element={<ProductComponent />} path=":id" />
              <Route element={<CartComponent />} path="/order" />
            </Routes>
          </Router>
        </Provider>
      </>
    )
  }
}
