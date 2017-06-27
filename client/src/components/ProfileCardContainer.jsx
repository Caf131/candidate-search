import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import { Panel, Modal, Button } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import RowBuilder from './RowBuilder';
import SearchBox from './SearchBox';
import Error from './Error';
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
    fetch('/profiles')
      .then((response) => {
        if(response.statusCode >= 400) {
          this.setState({ loading: false, error: true, loaded: false });
        }
        console.log('response => ', response);
        return response.json();
      })
      .then((data) => {
        console.log('data => ', data);
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
    console.log('activeProfile => ', activeProfile);
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
      const hasSocial = profile.social;

      const imageUrl = hasSocial ? profile.social.facebook ?
      profile.social.facebook.profile.picture.data.url : profile.social.linkedin ?
      profile.social.linkedin.profile.pictureUrl : "" : "";

      return <ProfileCard
        key={profile._id}
        firstName={profile.firstName}
        lastName={profile.lastName}
        email={profile.email || profile.emailAddress}
        location={profile.location}
        imageUrl={imageUrl}
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
            <SearchBox
              value={this.state.value}
              onInputChange={this.onInputChange}
              onFormSubmit={this.onFormSubmit}
            />
            <RowBuilder>
              {cardProfiles}
            </RowBuilder>
          </section>
        }
        {
          (showModal && activeProfile) &&
          <Modal show={showModal} onHide={this.closeModal} bsSize="large">
            <Modal.Header closeButton>
              <Modal.Title>{`${activeProfile.firstName} ${activeProfile.lastName}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>{`${activeProfile.employment.jobTitle}, ${activeProfile.employment.company}`}</h3>
              <h4>{activeProfile.employment.industry}</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
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
