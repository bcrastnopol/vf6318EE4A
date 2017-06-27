import React from 'react';
import styles from './FilterBar.css';

const FilterBar = (props) => {
  const state = {
    books: true,
    publishers: false,
  };
  return (
    <ul className={styles.nav}>
      <li><a onClick={props.update} data-show-books={state.books}>Books</a></li>
      <li><a onClick={props.update} data-show-books={state.publishers}>Publishers</a></li>
    </ul>
  );
};

export default FilterBar;
