import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import ImageFallBack from './ImageFallBack';
import fallbackImage from '../assets/fallback-person-image.jpg';
import { getImageUrl } from '../utils';

export default class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false,
      activeProfile: props.activeProfile
    };
  }

  componentDidMount() {
    const { showModal, activeProfile } = this.props;
    this.setState({ showModal, activeProfile });
  }

  componentWillReceiveProps({ showModal, activeProfile }) {
    if(this.state.showModal !== showModal) {
      this.setState({ showModal, activeProfile });
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, activeProfile } = this.state;

    return (
      <Modal show={showModal} onHide={this.closeModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{`${activeProfile.firstName} ${activeProfile.lastName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageFallBack className="profile-image" url={getImageUrl(activeProfile)} fallBackUrl={fallbackImage} />
          <h3>{`${activeProfile.employment.jobTitle}, ${activeProfile.employment.company}`}</h3>
          <h4 className="pad-bottom">{activeProfile.employment.industry}</h4>
          <div>
            <label>Job Description</label>
            <p>{activeProfile.employment.roleDescription}</p>
          </div>
          <label>Contact Information</label>
          <div>
            <p>{activeProfile.phone}</p>
            {
              (!isEmpty(activeProfile.linkedinUrl)) &&
              <section>
                <label>LinkedIn: <a target="_blank" href={activeProfile.linkedinUrl}>{activeProfile.linkedinUrl}</a></label>
              </section>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ProfileDetail.PropTypes = {
  showModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  activeProfile: PropTypes.object.isRequired
};
