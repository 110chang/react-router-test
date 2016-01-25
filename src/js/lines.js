//lines.js

'use strict';

import React from 'react'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem, Input, Button } from 'react-bootstrap'

export default class Lines extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  componentDidMount() {
    console.log('Lines component mounted');
  }
  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
  }
  findByKeyword() {
    let keyword = this.state.value;
    return this.props.lines.filter((line) => {
      let matchName = line.name.match(keyword);
      let matchStation = line.stations.filter((s) => s.name.match(keyword)).length > 0;
      return matchName || matchStation;
    });
  }
  render() {
    let filtered = this.state.value !== '' ? this.findByKeyword() : this.props.lines;
    let innerButton = <Button>
      <i className="fa fa-search"></i>
    </Button>;

    return (
      <div>
        <Input
          type="text"
          value={this.state.value}
          placeholder="Search..."
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          buttonAfter={innerButton}
          onChange={this.handleChange.bind(this)} />
        <ListGroup className="list-group-custom">
          {filtered.map((line) => {
            return <Link className="list-group-item-custom list-group-item" to={`/line/${line.id}`} key={line.id}>
              <span className="list-group-line-color" style={{ color: line.color }}>■</span>
              {line.name}
              <b className="list-group-line-supple"> / {line.goo_key} / {line.heartrails_key}</b>
            </Link>
          })}
        </ListGroup>
      </div>
    );
  }
}

