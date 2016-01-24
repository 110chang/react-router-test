//main.js

'use strict';

import React from 'react'
import { StyleSheet } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, hashHistory } from 'react-router'
import request from 'superagent'
import extend from 'extend'

import Lines from './lines'
import Line from './line'
import Station from './station'
import NotFound from './notfound'

console.log(StyleSheet);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lines: [] };
    request.get('./lines.json').end(this.handleFinishLoad.bind(this));
  }
  handleFinishLoad(err, res) {
    //console.log(JSON.parse(res.text));
    this.setState({ lines: JSON.parse(res.text) });
  }
  componentDidMount() {
    console.log('App component mounted');
  }
  render() {
    return (
      <div className="app">
        <header>
          <h1>This is react-router sample</h1>
        </header>
        <article>
          {this.props.children && React.cloneElement(this.props.children, {
            lines: this.state.lines
          })}
        </article>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Lines} />
      <Route path='/line/:lineId' component={Line}></Route>
      <Route path='/line/:lineId/:stationId' component={Station}></Route>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('app-entry'));

