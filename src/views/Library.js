import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const Library = ({currentlyReading, wantToRead, read, switchShelf}) => {
  return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf name = "Currently Reading" books = {currentlyReading} switchShelf = {switchShelf}/>
          <BookShelf name = "Want to Read" books = {wantToRead} switchShelf = {switchShelf}/>
          <BookShelf name = "Read" books = {read} switchShelf = {switchShelf}/>
        </div>
      </div>
      <div className="open-search">
          <Link className = "fab-link" to = "/search">Add a book</Link>
      </div>
    </div>
  )
};

Library.propTypes = {
  currentlyReading: PropTypes.arrayOf(PropTypes.object).isRequired,
  wantToRead: PropTypes.arrayOf(PropTypes.object).isRequired,
  read: PropTypes.arrayOf(PropTypes.object).isRequired,
  switchShelf: PropTypes.func.isRequired
};

export default Library;
