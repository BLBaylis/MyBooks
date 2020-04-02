import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ name, books }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {books.map(book => (
                    <li key = {`${book.id}-li`}>
                        <Book 
                            title = {book.title}
                            authors = {book.authors}
                            imageUrl = {book.imageLinks.thumbnail}
                        />
                    </li>
                ))}
                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BookShelf


