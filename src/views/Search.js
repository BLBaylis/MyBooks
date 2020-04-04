import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from '../components/Book';
import bookService from "../services/books";

class Search extends Component {
  
  state = {
    results: null,
    searching: false,
    searched: false,
    error: false
  };

  search = async ({target, key}) => {
    if (key === 'Enter' && target.value !== '') {
      try {
        this.setState({searching: true, results: null});
        const results = await bookService.search(target.value);
        this.setState({results, searching: false, searched: true});
      } catch (err) {
        console.error(err);
        this.setState({searching: false, error: true});
      }
      
    }
  };
  
  render() {
    const {results, searching, searched, error} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className = "close-search" to = "/">Close</Link>
          <div className="search-books-input-wrapper">
            <input onKeyDown = {this.search} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searching && <p>Loading...</p>}
            {error && <p>Oh no, we couldn't complete this search!  Please try again.</p>}
            {results && !results.length && searched && <p>Sorry, no books found for this query</p>}
            {results && results.map(result => (
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
