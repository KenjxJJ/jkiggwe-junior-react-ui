import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryComponent from './components/Category';
import NavBarComponent from './components/NavBar';
import ProductComponent from './components/Product';
import CartComponent from './components/Cart';

// Redux Store Config
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import allReducers from "./reducers";
import logger from "redux-logger";
import thunk from 'redux-thunk';

// Redux Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


export default class App extends Component {

  render() {
    let middlewareList;

    if (process.env.REACT_APP_ENVIRONMENT !== "production") {
      middlewareList = [thunk, logger];
    } else {
      middlewareList = [thunk];
    }

    // Config for redux-persist
    const persistConfig = {
      key: 'root1', storage,
    }

    const persistedReducer = persistReducer(persistConfig, allReducers)

    let store = createStore(persistedReducer, applyMiddleware(...middlewareList));

    let persistor = persistStore(store)

    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <NavBarComponent />
              <Routes>
                <Route element={<CategoryComponent />} path="/" />
                <Route element={<ProductComponent />} path=":id" />
                <Route element={<CartComponent />} path="/order" />
              </Routes>
            </Router>
          </PersistGate>
        </Provider>
      </>
    )
  }
}
