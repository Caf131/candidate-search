import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppRoot';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import ProfileCard from './components/ProfileCard';
import ProfileContainer from './components/ProfileCardContainer';
import SearchBox from './components/SearchBox';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Application = () => {
  return (
    <App>
      <Navigation />
      <ProfileContainer />
    </App>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
