import React, { Component } from 'react';
import bookService from './services/books'
import './App.css';

class App extends Component {

  state = {
    books: []
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
      <div className="App">
        <div>
          {this.state.books.map(book => <p key = {book.id}>{book.title}</p>)}
        </div>
      </div>
    );
  }
}

export default App;
