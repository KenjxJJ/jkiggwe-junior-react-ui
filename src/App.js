import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryComponent from './components/Category';
import NavBarComponent from './components/NavBar';
import ProductComponent from './components/Product';

export default class App extends Component {
  render() {
    return (
      <>
        <NavBarComponent />
        <Router>
          <Routes>
            <Route element={<CategoryComponent/>} path="/" />
            <Route element={<ProductComponent/>} path="/product" />
          </Routes>
        </Router>
      </>
    )
  }
}
