import React from 'react';
import styles from '../BookItem/BookItem.css';
import PropTypes from '../PropTypes';

class Publisher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.publisher = props.publisher;
  }
  render() {
    return (<div>
      <div className={styles.cover}>
        <img className="t-book-cover" src={`https://placeimg.com/150/200/people?id=${this.publisher.pk}`}/>
      </div>
      <div className={`${styles.body}`}>
        <span className="t-book-title">{this.publisher.name}</span>
      </div>
    </div>);
  }
}

Publisher.PropTypes = {
  publisher: PropTypes.publisher,
};

export default Publisher;