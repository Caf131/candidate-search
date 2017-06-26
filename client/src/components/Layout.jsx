import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Layout = ({ xs, md, children }) => {
  return (
    <div data-xs={xs} data-md={md}>
      {children}
    </div>
  )
}

Layout.PropTypes = {
  xs: PropTypes.number.isRequired,
  md: PropTypes.number.isRequired,
  children: PropTypes.node
};

export default Layout;
