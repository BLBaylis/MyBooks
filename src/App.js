import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Search from './views/Search';
import Library from './views/Library';
import bookService from './services/books';
import './App.css';

class App extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    this.getUserBooks()
  };

  getUserBooks = async () => {
    let books = await bookService.getAll();
    this.setState({books});
  };

  switchShelf = bookToSwitch => async newShelf => {
    const id = bookToSwitch.id;
    await bookService.update(id, newShelf);
    const updatedBook = {...bookToSwitch, shelf: newShelf}
    this.setState(({books}) => {
      const bookWasRemoved = newShelf === 'none';
      const newBookAdded = books.every(existingBook => existingBook.id !== id);
      let updatedBooks;
      if (bookWasRemoved) {
        updatedBooks = books.filter(existingBook => existingBook.id !== id);
      } else if (newBookAdded) {
        updatedBooks = books.concat(updatedBook);
      } else {
        updatedBooks = books.map(existingBook => existingBook.id === id ? updatedBook : existingBook);
      }
      return {books: updatedBooks};
    });
  }

  render() {
    const {books} = this.state;
    return (
      <div className="app">
        <Route exact path = "/" render = {() => <Library books = {books} switchShelf = {this.switchShelf}/>} />
        <Route path = "/search" render = {() => <Search books = {books} switchShelf = {this.switchShelf}/>} />
      </div>
    )
  }
};

export default App;
