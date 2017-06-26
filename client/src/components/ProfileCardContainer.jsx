import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import { Panel } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import RowBuilder from './RowBuilder';
import Error from './Error';

export default class ProfileCardContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      loaded: true,
      error: false,
      profiles: [{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      },{
        firstName: "Dave",
        lastName: "East"
      }]
    }
  }

  componentDidMount() {
    // fetch profiles
    // set state
  }

  render() {
    const { loading, loaded, error, profiles } = this.state;
    const cardProfiles = profiles.map((profile, idx) => {
      return <ProfileCard
        key={`profile-${idx}`}
        firstName={profile.firstName}
        lastName={profile.lastName}
        email={profile.email}
        location={profile.location}
      />
    });

    return (
      <div className="center-block">
        { loading &&
          <p className="text-center">
            <Loader size={50} />
          </p>
        }
        {
          error &&
          <Error message={"Sorry our system is not responding"} />
        }
        {
          (loaded && cardProfiles) &&
          <RowBuilder>
            {cardProfiles}
          </RowBuilder>
        }
      </div>
    )
  }
}

ProfileCardContainer.PropTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  profiles: PropTypes.array,
};
