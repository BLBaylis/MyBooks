import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Search from './views/Search'
import Library from './views/Library'
import bookService from './services/books'
import './App.css';

class App extends Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    showSearchPage: false
  }

  componentDidMount() {
    this.getUserBooks()
  }

  getUserBooks = async () => {
    let books = await bookService.getAll()
    books = { 
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read') 
    }
    this.setState({ books })
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
