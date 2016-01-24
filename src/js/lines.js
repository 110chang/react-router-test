//lines.js

'use strict';

import React from 'react'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class Lines extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Lines component mounted');
  }
  render() {
    return (
      <ListGroup className="lines">
        {this.props.lines.map((line) => {
          return <Link className="lineItem list-group-item" to={`/line/${line.id}`}>
            <span className="lineColor" style={{ color: line.color }}>■</span>
            {line.name}
            <b className="lineKey"> / {line.goo_key} / {line.heartrails_key}</b>
          </Link>
        })}
      </ListGroup>
    );
  }
  /*render() {
    return (
      <ul className="lines">
        {this.props.lines.map((line) => {
          return <li className="lineItem" key={line.id}>
            <span className="lineColor" style={{ color: line.color }}>■</span>
            <Link to={`/line/${line.id}`}>{line.name}</Link>
            <b className="lineKey"> / {line.goo_key} / {line.heartrails_key}</b>
          </li>
        })}
      </ul> 
    );
  }*/
}

