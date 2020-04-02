import React, { Component } from 'react';
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
        {this.state.showSearchPage ?
          <Search closeSearch = {() => this.setShowSearchPage(false)} /> : 
          <Library books = {this.state.books} openSearch = {() => this.setShowSearchPage(true)}/>
        }
      </div>
    )
  }
}

export default App;
