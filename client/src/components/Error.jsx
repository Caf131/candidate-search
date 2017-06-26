import React from 'react';
import { Panel } from 'react-bootstrap';
import ErrorStyles from './Error.scss';

const Error = ({ message }) => {
  return (
    <Panel className="error-message">
      <div className="col-md-12">
        <span className="glyphicon glyphicon-warning-sign center-block text-center" />
      </div>
      <div className="col-md-12">
        <p className="text-center pad-top">{message}</p>
      </div>
    </Panel>
  );
}

export default Error;
