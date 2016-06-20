import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Snackbar from 'material-ui/Snackbar';
import initializeServiceWorker from './serviceWorkerInit.js';

const LOCALSTORAGE_KEY = 'squash-scorer';
const initialState = Object.freeze({
  matches: {},
  isAppUpdatePromptVisible: false, // todo change to false
});

// AppBase is used to manage global app state, and rerender the current route
// hierarchy when it is modified.
export default class AppBase extends Component {
  constructor(props) {
    super(props);

    initializeServiceWorker(this.handleAppUpdateReady);

    const persistedState = window.localStorage.getItem(LOCALSTORAGE_KEY);
    this.state = persistedState ? JSON.parse(persistedState) : initialState;

    window.persistState = this.persistState;
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          matches: this.state.matches,
          upsert: this.upsert,
        })}

        <Snackbar
          open={this.state.isAppUpdatePromptVisible}
          message="New App Version Ready"
          action="Refresh"
          onActionTouchTap={this.handleAppReload}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }

  handleAppUpdateReady = (newServiceWorker) => {
    this.newServiceWorker = newServiceWorker;
    this.setState({ isAppUpdatePromptVisible: true });
  }

  handleAppReload = () => {
    this.newServiceWorker.postMessage({ action: 'skipWaiting' });
    this.setState({ isAppUpdatePromptVisible: false });
  }

  handleSnackbarClose = () => {
    this.setState({ isAppUpdatePromptVisible: false });
  }

  persistState = debounce(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.state));
  }, 500);

  upsert = (match) => {
    this.setState(state => ({
      matches: {
        ...state.matches,
        [match.id]: match,
      }
    }), persistState);
  }
}
