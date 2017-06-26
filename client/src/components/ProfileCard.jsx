import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import baseStyles from '../BaseStyles.scss';
import styles from './ProfileCard.scss';

const ProfileCard = ({ firstName, lastName, location, email }) => {
  return (
    <section>
      <Panel
        header={<h2 className="text-center">{`${firstName} ${lastName}`}</h2>}
        bsStyle="primary"
      >
        <Image
          src={"https://organicthemes.com/demo/profile/files/2012/12/profile_img.png"}
          responsive
          circle
          className="center-block"
        />
        <ListGroup>
          <ListGroupItem>
            <Label>Location:</Label><span></span>
            <span className="pad-left">{'New York, NY, USA'}</span>
          </ListGroupItem>
          <ListGroupItem>
            <Label>Status:</Label><span></span>
            <span className="pad-left">{'Employed'}</span>
          </ListGroupItem>
          <ListGroupItem>
            <Label>Email:</Label><span></span>
            <span className="pad-left">{'steve.jones@gmail.com'}</span>
          </ListGroupItem>
        </ListGroup>
      </Panel>
    </section>
  );
}

ProfileCard.PropTypes = {
  imageSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string
};

export default ProfileCard;
