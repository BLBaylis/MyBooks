import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const Library = ({books, switchShelf}) => {
  const shelfObjs = [
    {
      shelf: 'currentlyReading',
      label: 'Currently Reading'
    }, 
    {
      shelf: 'wantToRead',
      label: 'Want To Read'
    },
    {
      shelf: 'read',
      label: 'Read'
    } 
  ]
  return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfObjs.map(shelfObj => (
            <BookShelf 
              name = {shelfObj.label} 
              books = {books.filter(book => book.shelf === shelfObj.shelf)}
              switchShelf = {switchShelf}
              key = {shelfObj.label}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
          <Link className = "fab-link" to = "/search">Add a book</Link>
      </div>
    </div>
  )
};

Library.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  switchShelf: PropTypes.func.isRequired
};

export default Library;
