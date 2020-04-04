import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ name, books, switchShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {books.map(book => (
                    <li key = {`${book.id}-li`}>
                        <Book 
                            book = {book}
                            switchShelf = {switchShelf}
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
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    switchShelf: PropTypes.func.isRequired
}

export default BookShelf


