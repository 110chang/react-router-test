//main.js

'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap'
import request from 'superagent'
import extend from 'extend'

import Lines from './lines'
import Line from './line'
import Station from './station'
import NotFound from './notfound'

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
        <Navbar className="my-navbar" inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">This is react-router sample</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              {this.props.children && React.cloneElement(this.props.children, {
                lines: this.state.lines
              })}
            </Col>
          </Row>
        </Grid>
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

