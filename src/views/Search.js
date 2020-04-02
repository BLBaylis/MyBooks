import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
    
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.props.closeSearch}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

Search.propTypes = {
    closeSearch: PropTypes.func.isRequired
}

export default Search
