import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryComponent from './components/Category';
import NavBarComponent from './components/NavBar';

export default class App extends Component {
  render() {
    return (
      <>
        <NavBarComponent />
        <Router>
          <Routes>
            <Route element={<CategoryComponent/>} path="/" />
          </Routes>
        </Router>
      </>
    )
  }
}
