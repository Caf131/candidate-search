import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';

export default class RowBuilder extends Component {
  constructor(props) {
    super(props);
    this.childArray = React.Children.toArray(props.children);
    this.chunks = chunk(this.childArray, 4);
  }

  render() {
    const tree = this.chunks.map((rowGroup, idx) => {
      const cols = rowGroup.map((item, idx) => {
        return <div key={`col-${idx}`} className="col-md-3">{item}</div>
      });

      return <div key={`row-${idx}`} className="row">{cols}</div>
    });

    return (<div>{tree}</div>)
  }
}

RowBuilder.PropTypes = {
  children: PropTypes.node
};
