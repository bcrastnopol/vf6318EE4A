import React from 'react';
// import PropTypes from '../PropTypes';
import { putRating } from '../../services/api';
import styles from './Ratings.css';
import baseApiUrl from '../../index';

// Rating form component for users to rate books
class RatingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { val: 0 };
    this.book = props.book;
    this.setRating = this.setRating.bind(this);
  }


  setRating(e) {
    e.preventDefault();
    this.setState({ val: e.target.value });
    // In a bigger app this wouldn't be hardcoded but in the interest of time
    // I'm doing it since it doesn't change
    putRating('api', e.target.value, this.book).then(response => {
      console.log(response);
    });
  }

  // Simple list of radio buttons
  render() {
    return (
      <form onChange={this.setRating}
            id={`rating-form-${this.book.isbn}`}>
        <div className={`${styles.ratings_box}`}>
          <h4 className={`${styles.h4}`}>Rating</h4>
          <ul>
            {[...Array(5)].map((x, i) => {
              return <RatingItem key={i} name={`rating-${this.book.isbn}`}
                                 val={i}/>
            })}
          </ul>
        </div>
      </form>
    );
  }
}

// each list item is a RatingItem Component
const RatingItem = props => {
  const val = props.val + 1;
  return (
    <li className={`${styles.li}`}>
      {val}: <input type="radio" name={props.name} value={val}/>
    </li>
  );
};

export default RatingForm;
