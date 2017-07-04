import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Location from './Location';
import Email from './Email';
import ImageFallBack from './ImageFallBack';
import styles from './ProfileCard.scss';
import fallbackImage from '../assets/fallback-person-image.jpg';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      employmentStatus,
      imageUrl,
      profile
    } = this.props;

    return (
      <section>
        <Panel
          header={<h2 className="text-center">{`${firstName} ${lastName}`}</h2>}
          bsStyle="primary"
        >
          <ImageFallBack
            url={imageUrl}
            fallBackUrl={fallbackImage}
            className="profile-image"
          />
          <ListGroup>
            <ListGroupItem>
              <Location profile={profile} />
            </ListGroupItem>
            <ListGroupItem>
              <Label>Status:</Label>
              <div className="text-overflow-ellipsis">{employmentStatus}</div>
            </ListGroupItem>
            <ListGroupItem className="email">
              <Email email={email} />
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
  employmentStatus: PropTypes.string,
  email: PropTypes.string,
  children: PropTypes.node
};
