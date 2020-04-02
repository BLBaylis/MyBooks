import React, { Component } from 'react';
import Search from './views/Search'
import Library from './views/Library'
import bookService from './services/books'
import './App.css';

class App extends Component {

  state = {
    books: [],
    showSearchPage: false
  }

  getBooksData = async () => {
    const books = await bookService.getAll()
    this.setState({ books })
  }

  componentDidMount() {
    this.getBooksData()
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
