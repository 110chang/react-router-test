//notfound.js

'use strict';

import React from 'react'
import { Link } from 'react-router'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Not found component mounted');
  }
  render() {
    return (
      <div>
        <h2>Page not found</h2>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

