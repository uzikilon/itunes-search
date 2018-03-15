import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import 'bootstrap/dist/css/bootstrap.css';

class Container extends Component {

  constructor(params) {
    super(params);
    this.state = {
      results: [],
      pending: true,
    };
  }

  onSearch(data) {
    this.setState({ pending: true });
    fetch(`https://itunes.apple.com/search?${Object.keys(data).map(k => `${k}=${encodeURIComponent(data[k])}`).join('&')}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          results: data.results, 
          pending: false 
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>iTunes Search</h1>
        </div>
        <SearchForm pending={this.state.pending} onSearch={this.onSearch.bind(this)}/>
        <hr/>
        <SearchResults pending={this.state.pending} results={this.state.results}/>
      </div>
    );
  }
}


export default Container;