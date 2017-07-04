import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default class ImageFallBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false
    };
  }

  componentWillMount() {
    if(this.props.url) {
      fetch(this.props.url)
        .then((response) => {
          // console.log('response => ', response);
          if(response.status >= 400) {
            // console.log('failed statusCode!')
            this.setState({ failed: true })
          }
        })
        .then((data) => {
          // console.log('image loaded');
        })
        .catch((ex) => {
          // console.log('exception => ', ex);
        });
    } else {
      this.setState({ failed: true })
    }

  }

  render() {
    const { className } = this.props;

    return <Image
      src={this.state.failed ? this.props.fallBackUrl : this.props.url}
      responsive
      circle
      className={`center-block ${className}`}
    />;
  }
}

ImageFallBack.PropTypes = {
  url: PropTypes.string.isRequired,
  fallBackUrl: PropTypes.string.isRequired,
  className: PropTypes.string
};
