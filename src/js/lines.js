//lines.js

'use strict';

import React from 'react'
import { Link } from 'react-router'

export default class Lines extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Lines component mounted');
  }
  render() {
    return (
      <ul className="lines">
        {this.props.lines.map((line) => {
          return <li key={line.id}>
            <span style={{ color: line.color }}>■</span>
            <Link to={`/line/${line.id}`}>{line.name}</Link>
            <b className="lineKey"> / {line.goo_key} / {line.heartrails_key}</b>
          </li>
        })}
      </ul> 
    );
  }
}

