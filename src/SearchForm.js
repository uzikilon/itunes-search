import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class SearchForm extends Component {

    constructor(params) {
      super(params);
  
      this.state = {
        media: 'all',
        limit: 20,
        term: '',
        init: true,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.isValid()) {
        this.props.onSearch(this.state);
      }
      else {
        this.setState({init: false});
      }
    }

    isValid() {
      return !!this.state.term;
    }
  
    handleInputChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    render() {
      return (
        <form className="form-inline" onSubmit={this.handleSubmit} >
          <FormGroup controlId="term" validationState={this.state.init || !!this.state.term ? null : 'error'}>
            <ControlLabel>Query</ControlLabel>{' '}
            <FormControl type="text" placeholder="Search term" defaultValue={this.state.term} onChange={this.handleInputChange} />
            <FormControl.Feedback />
          </FormGroup>{' '}
          <FormGroup controlId="media">
            <ControlLabel>Type</ControlLabel>{' '}
            <FormControl componentClass="select" placeholder="Search Type" defaultValue={this.state.media} onChange={this.handleInputChange}>
              <option value="all">All</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="musicVideo">Music Video</option>
            </FormControl>
          </FormGroup>{' '}
          <FormGroup controlId="limit">
            <ControlLabel># of Results</ControlLabel>{' '}
            <FormControl componentClass="select" defaultValue={this.state.limit} onChange={this.handleInputChange}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </FormControl>
          </FormGroup>{' '}
          <Button type="submit">Search</Button>
        </form>
      );
    }
  
}

export default SearchForm;