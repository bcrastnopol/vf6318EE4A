import React from 'react';
import PropTypes from '../PropTypes';
import RatingForm from  '../Ratings/Ratings';
import styles from './BookItem.css';
import { getBook } from '../../services/api';


class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
    };
    this.render = this.render.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  updateBook() {
    getBook('api', this.state.book).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ book: data });
    });
  }

  render() {
    return (
      <div className={styles.item}>
        <div className={styles.cover}>
          <img className="t-book-cover"
               src={`https://placeimg.com/150/200/nature?id=${this.state.book.pk}`}/>
        </div>
        <div className={`${styles.body}`}>
          <span className="t-book-title">{this.state.book.title}</span>
          <p className="t-book-description">{this.state.book.description}</p>
          <p className="t-book-rating"> Average
            Rating: {this.state.book.average_rating.toFixed(1)}</p>
          <RatingForm book={this.state.book} updateBook={this.updateBook}/>
        </div>
      </div>
    );
  }
}
;

BookItem.propTypes = {
  book: PropTypes.book
};

export default BookItem;
