import React from 'react';
import PropTypes from '../PropTypes';
import Publisher from '../Publisher/Publisher';
import styles from '../BookList/BookList.css';

const PublisherList = props => {
  const { publishers } = props;

  return (
    <div>
      <h1>Publishers</h1>
      <ol className={styles.list}>
        {publishers.map(publisher =>
          <li key={publisher.pk}><Publisher publisher={publisher}/></li>
        )}
      </ol>
    </div>
  );
};

PublisherList.PropTypes = {
  publishers: PropTypes.publisherList,
};

export default PublisherList;