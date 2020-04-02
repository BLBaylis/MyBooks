import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf'

class Library extends Component {
    
    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf name = "Currently Reading" books = {this.props.books} />
                <BookShelf name = "Want to Read" books = {this.props.books} />
                <BookShelf name = "Read" books = {this.props.books} />
              </div>
            </div>
            <div className="open-search">
                <Link className = "fab-link" to = "/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

Library.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    openSearch: PropTypes.func.isRequired
}

export default Library
