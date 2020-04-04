import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from '../components/Book';
import bookService from "../services/books";
import utils from '../utils';

class Search extends Component {
  
  state = {
    query: '',
    results: null,
    searching: false,
    error: false
  };

  addShelfInfoToBooksInLibrary = (searchResults, libraryBooks) => {
    const existingBooksInLibraryIds = utils.intersect(
      libraryBooks.map(libraryBook => libraryBook.id),
      searchResults.map(result => result.id)
    )
    return searchResults.map(result => {
      const resultExistsInLibrary = existingBooksInLibraryIds.includes(result.id)
      if (!resultExistsInLibrary) {
        return result
      }
      return {
        ...result, 
        shelf: libraryBooks.filter(libraryBook => libraryBook.id === result.id)[0].shelf
      }
    })
  }

  search = async ({target}) => {
    await this.setState({query: target.value})
    const query = this.state.query;
    if (query) {
      try {
        this.setState({searching: true, results: null, error: false});
        let results = await bookService.search(query);
        results = results.error ? null : this.addShelfInfoToBooksInLibrary(results, this.props.books);
        this.setState({
          results,
          searching: false
        });
      } catch (err) {
        console.error(err);
        this.setState({results: null, searching: false, error: true});
      }
    } else {
      this.setState({results: null, error: false})
    }
  };
  
  render() {
    const {results, searching, error, query} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className = "close-search" to = "/">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange = {this.search} value = {query} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searching && <p>Loading...</p>}
            {query && error && <p>Oh no, we couldn't complete this search!  Please try again.</p>}
            {query && !results && !searching && <p>Sorry, no books found for this query</p>}
            {query && results && results.map(result => (
              <Book 
                key = {result.id}
                book = {result}
                switchShelf = {this.props.switchShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
};

Search.propTypes = {
  switchShelf: PropTypes.func.isRequired
};

export default Search;
