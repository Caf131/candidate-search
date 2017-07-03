import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  getLocationFromProfile
} from '../utils';

const Location = ({ profile }) => {
  const formattedLocation = getLocationFromProfile(profile);

  return (
    <section>
      <Label>Location:</Label>
      <div className="text-overflow-ellipsis">{formattedLocation}</div>
    </section>
  );
}

Location.PropTypes = {
  profile: PropTypes.object,
}

export default Location;
