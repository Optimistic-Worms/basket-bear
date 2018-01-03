import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';


if (module.hot && HOT) {
  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>,
      document.getElementById('root')
    )
  }

  render(App);

  module.hot.accept('../components/App.jsx', () => {
    const NextApp = require('../components/App.jsx').default;
    render(NextApp);
  })
} else {
  render(App);
}
