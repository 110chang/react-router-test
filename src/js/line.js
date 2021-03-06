//line.js

'use strict';

import React from 'react'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'

const __defaults = {
  color: '#999',
  goo_key: '',
  heartrails_key: '',
  id: -1,
  ignore: null,
  loop: false,
  name: '',
  notes: null,
  stations: [],
  subway: false
};

export default class Line extends React.Component {
  constructor(props) {
    super(props);
  }
  static getInitialValue() {
    return __defaults;
  }
  static findLine(lines, _id) {
    _id = _id | 0;
    return lines.filter((l) => l.id === _id)[0] || Line.getInitialValue();
  }
  componentDidMount() {
    console.log('Line component mounted');
  }
  render() {
    let line = Line.findLine(this.props.lines, this.props.params.lineId);

    return (
      <div className="line" key={line.id}>
        <h2>
          <span style={{ color: line.color }}>■</span>
          {line.name}
        </h2>
        <Table>
          <tbody>
            <tr>
              <th>goo路線</th>
              <td>{line.goo_key}</td>
            </tr>
            <tr>
              <th>HeartRails</th>
              <td>{line.heartrails_key}</td>
            </tr>
            <tr>
              <th>loop</th>
              <td>{line.loop.toString()}</td>
            </tr>
            <tr>
              <th>subway</th>
              <td>{line.subway.toString()}</td>
            </tr>
          </tbody>
        </Table>
        <ListGroup className="list-group-custom">
          {line.stations.map((station, i) => {
            return <Link className="list-group-item-custom list-group-item" to={`/line/${line.id}/${i}`} key={i}>
              <span className="list-group-line-color" style={{ color: line.color }}>■</span>
              {station.name}
            </Link>
          })}
        </ListGroup>
        <Link to="/">Home</Link>
      </div>
    );
  }
}