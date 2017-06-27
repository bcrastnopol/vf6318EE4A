import 'isomorphic-fetch';

const getBooks = baseApiUrl => {
  const url = `${baseApiUrl}/books/`;
  return fetch(url);
};



const putRating = (baseApiUrl, rating, book) => {
  const url = `${baseApiUrl}/ratings/`;
  return fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        rating: rating,
        book: book,
      }),
    }
  );
};


const getPublishers = baseApiUrl => {
  const url = `${baseApiUrl}/publishers/`;
  return fetch(url);

};
// const logIn = (baseApiUrl, username, password) => {
//   const url = `${baseApiUrl}/users/`;
//   debugger;
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       username: username,
//       password: password,
//     }),
//   });
// };

export {
  getBooks,
  putRating,
  getPublishers
  // logIn,
};
