import React, { Component, PropTypes } from 'react';
import * as colors from '../utils/colors.js';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import MatchCard from './MatchCard.js';
import FAB from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import InlineSVG from 'svg-inline-react';
import { StyleSheet, css } from 'aphrodite';
import logo from './logo.svg';

export default class Matches extends Component {
  render() {
    const { matches } = this.props;
    const orderedMatches = orderBy(matches, ['creationTimestamp'], ['desc']);

    return (
      <div>
        <div className={css(styles.header)}>
          <InlineSVG style={{ width: 25, height: 25 }} src={logo} />
          <div className={css(styles.headerTitle)}>SquashScorer</div>
        </div>
        <div className={css(styles.main)}>
          {map(orderedMatches, match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <FAB
          className={css(styles.fab)}
          onClick={() => this.context.router.push('/match/new')}>
          <Add />
        </FAB>
      </div>
    );
  }
}

Matches.contextTypes = {
  router: PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.green,
    padding: '15px 15px',
    color: '#fff',
    fontWeight: 600,
    position: 'fixed',
    width: '100%',
    zIndex: 2,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 0px 1px',
    display: 'flex',
    alignContent: 'center',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 5,
  },
  main: {
    padding: 10,
    paddingTop: 55 + 10, // height of header
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    right: 15,
    bottom: 18,
    zIndex: 1,
  },
});
