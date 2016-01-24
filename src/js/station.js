//station.js

'use strict';

import React from 'react'
import { Link } from 'react-router'

import Line from './line'

const __defaults = {
  line: '',
  name: '',
  next: '',
  postal: '',
  prefecture: '',
  prev: '',
  x: 0,
  y: 0
}

export default class Station extends React.Component {
  constructor(props) {
    super(props);
  }
  static getInitialValue() {
    return __defaults;
  }
  componentDidMount() {
    console.log('Station component mounted');
  }
  render() {
    let line = Line.findLine(this.props.lines, this.props.params.lineId);
    let station = line.stations[this.props.params.stationId] || Station.getInitialValue();
    let belongs = this.props.lines.filter((line) => {
      return line.stations.filter((sta) => {
        return sta.name === station.name && station.line !== line.heartrails_key;
      }).length > 0;
    });

    station.prev = station.prev == 'null' ? null : station.prev;
    station.next = station.next == 'null' ? null : station.next;

    return (
      <div>
        <h2>{station.name}駅</h2>
        <p>
          <span style={{ color: line.color }}>■</span>
          <Link to={`/line/${line.id}`}>{line.name}</Link>
        </p>
        <table>
          <tbody>
            <tr>
              <th>postal</th>
              <td>{station.postal}</td>
            </tr>
            <tr>
              <th>prefecture</th>
              <td>{station.prefecture}</td>
            </tr>
            {station.prev ?
              <tr>
                <th>prev</th>
                <td>{station.prev}駅</td>
              </tr>
            : null}
            {station.next ?
              <tr>
                <th>next</th>
                <td>{station.next}駅</td>
              </tr>
            : null}
            <tr>
              <th>lat/lng</th>
              <td>東経{station.x}/北緯{station.y}</td>
            </tr>
          </tbody>
        </table>
        {belongs.length > 0 ?
          <section>
            <h3>その他の路線</h3>
            <ul>
              {belongs.map((line) => {
                return <li key={line.id}>
                  <span style={{ color: line.color }}>■</span>
                  <Link to={`/line/${line.id}`}>{line.name}</Link>
                </li>
              })}
            </ul>
          </section>
        : null}
        <Link to="/">Home</Link>
      </div>
    );
  }
}

