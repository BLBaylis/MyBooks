import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Search from './views/Search'
import Library from './views/Library'
import './App.css';

class App extends Component {

  state = {
    books: [],
    showSearchPage: false
  }

  setShowSearchPage = status => this.setState({ showSearchPage: status })

  render() {
    return (
      <div className="app">
        <Route exact path = "/" render = {() => <Library books = {this.state.books}/>} />
        <Route path = "/search" component = {Search}/>
      </div>
    )
  }
}

export default App;
