import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import ImageFallBack from './ImageFallBack';
import baseStyles from '../BaseStyles.scss';
import styles from './ProfileCard.scss';
import fallbackImage from '../assets/fallback-person-image.jpg';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { firstName, lastName, email, location, status, imageUrl } = this.props;

    return (
      <section>
        <Panel
          header={<h2 className="text-center">{`${firstName} ${lastName}`}</h2>}
          bsStyle="primary"
        >
          <ImageFallBack
            url={imageUrl}
            fallBackUrl={fallbackImage}
          />
          <ListGroup>
            <ListGroupItem>
              <Label>Location:</Label>
              <div>{`${location.city}, ${location.state}`}</div>
            </ListGroupItem>
            <ListGroupItem>
              <Label>Status:</Label>
              <div>{status}</div>
            </ListGroupItem>
            <ListGroupItem className="email">
              <Label>Email:</Label>
              <div className="email text-overflow-ellipsis">{email}</div>
            </ListGroupItem>
          </ListGroup>
          {this.props.children}
        </Panel>
      </section>
    );
  }
}

ProfileCard.PropTypes = {
  imageUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
  children: PropTypes.node
};
