import React, { Component } from 'react';
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setShowSearchPage(false)}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : <Library books = {this.state.books} openSearch = {() => this.setShowSearchPage(true)}/>}
      </div>
    )
  }
}

export default App;
