import PropTypes from 'prop-types';

const { arrayOf, number, shape, string } = PropTypes;

const book = shape({
  authors: arrayOf(number.isRequired),
  description: string.isRequired,
  pk: number.isRequired,
  publisher: number.isRequired,
  title: string.isRequired,
  average_rating: number.isRequired,
});

const bookList = arrayOf(book);

const publisher = shape({
  pk: number.isRequired,
  name: string.isRequired,
});

const publisherList = arrayOf(publisher);

export default {
  book,
  bookList,
  publisher,
  publisherList
};
