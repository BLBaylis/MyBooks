import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Search from './views/Search';
import Library from './views/Library';
import bookService from './services/books';
import './App.css';

class App extends Component {

  state = {
    all: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.getUserBooks()
  };

  getUserBooks = async () => {
    let books = await bookService.getAll();
    this.setState({ 
      all: books,
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read') 
    });
  };

  switchShelf = book => async newShelf => {
      const {id, shelf: oldShelf} = book;
      if (oldShelf === newShelf) {
        return
      };
      await bookService.update(id, newShelf);
      this.setState(({ all, ...shelves}) => {
        const bookWasRemoved = newShelf === 'none';
        const existingBookMoved = all.some(existingBook => existingBook.id === id);
        const newBookAdded = !existingBookMoved;
        if (bookWasRemoved) {
          // remove book from all and the shelf it was on
          return {
            all: all.filter(existingBook => existingBook.id !== id),
            [oldShelf]: shelves[oldShelf].filter(existingBook => existingBook.id !== id)
          };
        } else if (existingBookMoved) {
          // remove from old shelf and add to new shelf
          return {
            [newShelf]: shelves[newShelf].concat({...book, shelf: newShelf}),
            [oldShelf]: shelves[oldShelf].filter(book => id !== book.id)
          };
        } else if (newBookAdded) {
          // add to all and add to shelf
          return {
            all: all.concat(book),
            [newShelf]: shelves[newShelf].concat({...book, shelf: newShelf})
          };
        }
      });
  }

  render() {
    const {all, currentlyReading, wantToRead, read} = this.state;
    return (
      <div className="app">
        <Route 
          exact 
          path = "/" 
          render = {() => 
            <Library 
              currentlyReading = {currentlyReading} 
              wantToRead = {wantToRead}
              read = {read}
              switchShelf = {this.switchShelf}/>
            } 
          />
        <Route path = "/search" render = {() => <Search books = {all} switchShelf = {this.switchShelf}/>} />
      </div>
    )
  }
};

export default App;
