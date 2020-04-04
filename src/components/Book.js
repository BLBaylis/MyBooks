import React from 'react';
import PropTypes from 'prop-types';
import ShelfSelect from './ShelfSelect';

const bookCoverStyles = {
  width: 128, 
  height: 193,
  display: 'flex',
  alignItems: 'center'
}

const Book = ({book, switchShelf}) => {
  const { title, authors, imageLinks, shelf } = book;
  let backgroundImage =  'initial';
  if (imageLinks && imageLinks.thumbnail) {
    backgroundImage = `url("${imageLinks.thumbnail}")`;
  }
  return (
    <div className="book">
      <div className="book-top">
      <div className="book-cover" style={{...bookCoverStyles, backgroundImage}}>
        {backgroundImage === 'initial' && <span style = {{textAlign: 'center'}}>Thumbnail Not Found</span>}
      </div>
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


