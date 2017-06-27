import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';
import styles from './SearchBox.scss';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    const { value } = e.target;
    this.setState({ value });
    this.props.onInputChange(e, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value } = this.state;
    this.props.onFormSubmit(e, value);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="search-form"
      >
        <FormGroup
          controlId="search-box"
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder={this.props.placeHolder || "Search"}
            onChange={this.handleOnChange}
            className="search-box"
          />
        </FormGroup>
      </form>
    );
  }
}

SearchBox.PropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  placeHolder: PropTypes.string
}

SearchBox.defaultProps = {
  value: ''
}
