import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppBase from './AppBase.js';
import Matches from './Matches.js';
import NewMatch from './NewMatch.js';
import Match from './Match.js';

export default class Root extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={AppBase}>
          <IndexRoute component={Matches} />
          <Route path='/match/new' component={NewMatch} />
          <Route path='/match/:matchId' component={Match} />
        </Route>
      </Router>
    );
  }
}
