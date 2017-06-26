import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppRoot';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import ProfileCard from './components/ProfileCard';
import ProfileContainer from './components/ProfileCardContainer';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const Application = () => {
  return (
    <App>
      <Navigation />
      <Layout xs={12} md={12}>
        <ProfileContainer />
      </Layout>
    </App>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
