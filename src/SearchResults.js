import React, { Component } from 'react';
import { Table, Pager, Pagination, Modal , Button, Glyphicon} from 'react-bootstrap';

const RESULTS_PER_PAGE = 10;

function Row(props) {
  return (
    <tr>
      <td>{ props.counter }</td>
      <td><a target="_blank" href={props.data.artistViewUrl}>{ props.data.artistName }</a></td>
      <td><a href="#" onMouseOver={() => props.playMedia(props.data)}>{ props.data.trackName }</a></td>
      <td>{ props.data.trackPrice } {props.data.currency}</td>
      <td>{ props.data.kind }</td>
      <td>{ props.data.releaseDate }</td>
      <td>{ props.data.country }</td>
    </tr>
  );
}

class SearchResults extends Component {

  constructor(params) {
    super(params);
    this.state = {
      page: 1
    };

    this.stopMedia = this.stopMedia.bind(this);
  }

  pagerOnClick(page, disabled) {
    if (!disabled) {
      this.setState({page});
    }
  }

  createPagination() {
    const numPages = Math.ceil(this.props.results.length / RESULTS_PER_PAGE);
    if (numPages == 1) {
      return '';
    }
    
    const items = [];
    for (let i = 1; i <= numPages; i++) {
      const active = i === this.state.page;
      items.push(
        <Pagination.Item onClick={() => this.pagerOnClick(i, active)} key={i} active={active}>{i}</Pagination.Item>
      );
    }

    const isFirst = this.state.page == 1;
    const isLast = this.state.page == numPages;
    return (
      <Pager>
        <Pagination.Item previous onClick={() => this.pagerOnClick(this.state.page - 1, isFirst)} disabled={isFirst}><Glyphicon glyph="chevron-left" /></Pagination.Item>
        {items}
        <Pagination.Item next onClick={() => this.pagerOnClick(this.state.page + 1, isLast)} disabled={isLast}><Glyphicon glyph="chevron-right" /></Pagination.Item>
      </Pager>
    )

    
  }

  playMedia(data) {
    let mediaPlayer;
    if (data.kind === 'song') {
      mediaPlayer = <audio controls autoPlay="true" src={data.previewUrl}/>;
    }
    else {
      mediaPlayer = <video width="550" controls autoPlay="true" src={data.previewUrl}/>;
    }
    this.setState({mediaPlayer});
  }

  stopMedia() {
    this.setState({mediaPlayer: null});
  }
  
  render() {
    if (this.props.pending) {
      return '';
    } 

    if (this.props.results.length === 0 ) {
      return <div className="well">No Results</div>;
    }

    const start = this.state.page - 1;
    const rows = this.props.results
      .slice(start, start + RESULTS_PER_PAGE)
      .map((data, i) => <Row playMedia={() => this.playMedia(data)} key={data.trackId} counter={start * RESULTS_PER_PAGE + i + 1} data={data} />)

    return (
      <div>
        <Table responsive striped bordered>
          <thead>
              <tr>
                <th>#</th>
                <th>Artist Name</th>
                <th>Track Name</th>
                <th>Price</th>
                <th>Type</th>                
                <th>Release Date</th>
                <th>Country</th>
              </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        
        {this.createPagination()}
        
        <div className="static-modal">
        <Modal show={!!this.state.mediaPlayer} onHide={this.stopMedia}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Media Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.mediaPlayer}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.stopMedia}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>

      </div>
    );
  }
}

export default SearchResults;