import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.children = React.Children.toArray(props.children);
  }

  render() {
    return (
      <Grid fluid>
        { React.Children.map(this.children, (child) => {
            if(React.isValidElement(child)) {
              return (<Row><Col xs={child.props.xs} md={child.props.md}>{child}</Col></Row>);
            }
        })}
      </Grid>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node
}
