import React, { Component } from 'react';
import BookShelf from './components/BookShelf'
import Book from './components/Book'
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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf name = "Currently Reading" books = {this.state.books} />
                <BookShelf name = "Want to Read" books = {this.state.books} />
                <BookShelf name = "Read" books = {this.state.books} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;
