import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppRoot';
import Navigation from './components/Navigation';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const Application = () => {
  return (
    <App>
      <Navigation />
    </App>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
