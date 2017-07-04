import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

const Email = ({ email }) => {
  return (
    <section>
      <Label>Email:</Label>
      <div className="email text-overflow-ellipsis">
        <a className="text-overflow-ellipsis" href={`mailTo:${email}`} title={email}>{email}</a>
      </div>
    </section>
  );
}

Email.PropTypes = {
  email: PropTypes.string.isRequired
};

export default Email;
