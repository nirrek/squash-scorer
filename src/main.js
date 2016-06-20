import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './app/Root.js';
import './app/app.css';

// Allows material-ui interactions to avoid 300ms tap delay on mobile.
injectTapEventPlugin();

const rootEl = document.getElementById('root');

import * as colors from './utils/colors.js';
const muiTheme = {
  palette: {
    primary1Color: colors.green,
    accent1Color: colors.green,
  },
};

ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Root />
    </MuiThemeProvider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./app/Root.js', () => {
    const NextRoot = require('./app/Root.js').default;
    ReactDOM.render(
      <AppContainer>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <NextRoot />
        </MuiThemeProvider>
      </AppContainer>,
      rootEl
    );
  });
}
