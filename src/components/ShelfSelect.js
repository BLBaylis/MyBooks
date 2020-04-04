import React from 'react';
import PropTypes from 'prop-types';

const ShelfSelect = ({shelf, switchShelf}) => (
  <div className="book-shelf-changer">
    <select onChange = {event => switchShelf(event.target.value)} value = {shelf}>
      <option value="move" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

ShelfSelect.propTypes = {
  shelf: PropTypes.string.isRequired,
  switchShelf: PropTypes.func.isRequired
};

export default ShelfSelect;
