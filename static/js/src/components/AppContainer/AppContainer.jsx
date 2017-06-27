import React, {Component} from 'react';
import BookList from '../BookList/BookList';
import PublisherList from '../PublisherList/PublisherList';
import FilterBar from '../FilterBar/FilterBar';
import {getBooks, getPublishers} from '../../services/api';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      showBooks: true,
      books: [],
      publishers: [],
    };
    this.updateShowBooks = this.updateShowBooks.bind(this);
  }

  componentWillMount() {
    this.getBookData();
    this.getPublisherData();
  }

  getBookData () {
    getBooks(this.props.baseApiUrl).then(response => {
      return response.json();
    }).then(data => {
      this.setState({books: data});
    });
  }

  getPublisherData () {
    getPublishers(this.props.baseApiUrl).then(response => {
      return response.json();
    }).then(data => {
      this.setState({publishers: data});
    });
  }
  updateShowBooks (e) {
    this.setState({showBooks: JSON.parse(e.target.dataset.showBooks)});
    this.render();
  }

  togglePages (e) {
    if (this.state.showBooks)
      return <BookList books={this.state.books}/>;
    return <PublisherList publishers={this.state.publishers}/>;
  }
  render() {
    return (
      <div>
        <FilterBar showBooks={this.state.showBooks} update={this.updateShowBooks}/>
        {!this.state.showBooks && <PublisherList publishers={this.state.publishers}/>}
        {this.state.showBooks && <BookList books={this.state.books}/>}
      </div>
    );
  }
}
