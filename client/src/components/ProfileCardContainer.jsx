import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import { Panel, Button, Label } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';
import RowBuilder from './RowBuilder';
import SearchBox from './SearchBox';
import DropdownFilter from './DropdownFilter';
import Error from './Error';
import {
  getIndustries,
  getLocations,
  getSeniorityLevels,
  getProfileSnap
} from '../services/services';
import { getImageUrl } from '../utils';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class ProfileCardContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      error: false,
      profiles: [],
      dropdown: {},
      term: '',
      showOverlay: false,
      activeProfile: null
    }

    this.closeModal = this.closeModal.bind(this);
    this.btnViewProfileClick = this.btnViewProfileClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true, error: false, loaded: false });
    getProfileSnap(50)
      .then((data) => {
        this.setState({
          loading: false,
          error: false,
          loaded: true,
          profiles: data
        });
      });
  }

  btnViewProfileClick (profileIndex) {
    // select the target profile
    const activeProfile = this.state.profiles[profileIndex];
    // here fetch the rest of the data
    this.setState({
      activeProfile,
      showModal: true
    });
  }

  onInputChange(e, value) {
    this.setState({ value });
  }

  onFormSubmit(e, value) {
    e.preventDefault();
    this.setState({ value });
    // do other stuff, fetch data
  }

  closeModal() {
    this.setState({
      showModal: false,
      activeProfile: null
    });
  }

  render() {
    const {
      loading,
      loaded,
      error,
      profiles,
      showModal,
      activeProfile
    } = this.state;

    const cardProfiles = profiles.map((profile, idx) => {
      return <ProfileCard
        key={profile._id}
        firstName={profile.firstName}
        lastName={profile.lastName}
        email={profile.email || profile.emailAddress}
        imageUrl={getImageUrl(profile)}
        employmentStatus={profile.employment.employmentStatus}
        profile={profile}
      >
        <Button
          onClick={this.btnViewProfileClick.bind(null, idx)}
          className="btn-primary"
          block
        >
          View Full Profile
        </Button>
      </ProfileCard>
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
          <section>
            <div className="col-md-2">
              <h4>Candidate Filters<span className="glyphicon glyphicon-filter"></span></h4>
              <SearchBox
                value={this.state.value}
                onInputChange={this.onInputChange}
                onFormSubmit={this.onFormSubmit}
              />
              <DropdownFilter id={"industry_filter"} provider={getIndustries} title={"Industry"} />
              <DropdownFilter id={"location_filter"} provider={getLocations} title={"Locations"} />
              <DropdownFilter id={"seniority_filter"} provider={getSeniorityLevels} title={"Seniority Level"} />
            </div>
            <div className="col-md-10">
              <RowBuilder>
                {cardProfiles}
              </RowBuilder>
            </div>
          </section>
        }
        {
          (showModal && activeProfile) &&
          <ProfileDetail showModal activeProfile={activeProfile} />
        }
      </div>
    );
  }
}

ProfileCardContainer.PropTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  profiles: PropTypes.array,
};
