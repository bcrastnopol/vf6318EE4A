import React from 'react';
import PropTypes from '../PropTypes';
import styles from './BookItem.css';
import RatingForm from  '../Ratings/Ratings';

const BookItem = props => {
  const {book} = props;

  return (
    <div className={styles.item}>
      <div className={styles.cover}>
        <img className="t-book-cover" src={`https://placeimg.com/150/200/nature?id=${book.pk}`}/>
      </div>
      <div className={`${styles.body}`}>
        <span className="t-book-title">{book.title}</span>
        <p className="t-book-description">{book.description}</p>
        <p className="t-book-rating">{book.rating}</p>
        <RatingForm book={book}/>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.book
};

export default BookItem;
