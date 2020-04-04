import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelect from './ShelfSelect';

const Book = ({book, switchShelf}) => {
  const { title, authors, imageLinks, shelf } = book;
  return (
    <div className="book">
      <div className="book-top">
      <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
        <ShelfSelect shelf = {shelf || 'none'} switchShelf = {switchShelf(book)}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(", ").trim()}</div>
    </div>  
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  switchShelf: PropTypes.func.isRequired
};

export default Book;


