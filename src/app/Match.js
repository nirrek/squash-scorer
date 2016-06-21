import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Card from './Card.js';
import * as colors from '../utils/colors.js';
import { darken } from 'material-ui/utils/colorManipulator';
import AppBar, { AppBarActions, AppBarTitle } from './AppBar.js';
import IconButton from 'material-ui/IconButton';
import { StyleSheet, css } from 'aphrodite';

export default class Match extends Component {
  render() {
    const match = this.getMatch();
    const [player0, player1] = match.players;

    return (
      <div>
        <AppBar>
          <AppBarActions>
            <IconButton
              className={css(styles.backButton)}
              onClick={this.handleClickBack}>
              <ArrowBack />
            </IconButton>
          </AppBarActions>
          <AppBarTitle>{player0.name} vs {player1.name}</AppBarTitle>
        </AppBar>
        <div className={css(styles.box)}>
          {this.renderScorer(player0, 0)}
          {this.renderScorer(player1, 1)}
          <div className={css(styles.completeMatchBox)}>
            {match.isComplete ? (
              <div>
                <h2 className={css(styles.matchCompleteText)}>Match complete</h2>
                <FlatButton label="Re-enable Editing" onClick={() => this.toggleComplete(false)} />
              </div>
            ) : (
              <RaisedButton
                label="Mark Match As Complete"
                primary
                onClick={() => this.toggleComplete(true)}
                className={css(styles.markCompleteButton)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  handleClickBack = () => this.context.router.goBack()

  toggleComplete = (isComplete) => {
    const match = this.getMatch();
    this.props.upsert({ ...match, isComplete });
  }

  changeScore = (changeBy, playerIdx) => () => {
    const match = this.getMatch();
    match.players[playerIdx].score += changeBy;
    this.props.upsert({ ...match  })
  }

  getMatch = () => {
    return this.props.matches[this.props.routeParams.matchId];
  }

  isWinner = (playerIdx) => {
    const { isComplete, players } = this.getMatch();
    if (!isComplete) return false;
    return (playerIdx === 0) ?
      players[0].score > players[1].score :
      players[1].score > players[0].score;
  }

  renderScorer = (player, playerIdx) => {
    const { isComplete, players } = this.getMatch();
    const scoreDisplayStyle = [
      styles.scoreDisplay,
      this.isWinner(playerIdx) && styles.scoreDisplayWinner,
    ];

    return (
      <Card className={css(styles.scorerCard)}>
        <div className={css(styles.scorer)}>
          {!isComplete && (
            <FlatButton
              disabled={player.score === 0 || isComplete}
              onClick={this.changeScore(-1, playerIdx)}
              icon={<Remove />}
              className={css(styles.scoreChangerBtn)} />
          )}

          <div className={css(...scoreDisplayStyle)}>
            <div className={css(styles.playerName)}>{player.name}</div>
            <div className={css(styles.playerScore)}>{player.score}</div>
          </div>
          {!isComplete && (
            <FlatButton
              disabled={isComplete}
              onClick={this.changeScore(+1, playerIdx)}
              icon={<Add />}
              className={css(styles.scoreChangerBtn)} />
          )}
        </div>
      </Card>
    );
  }
}

Match.contextTypes = {
  router: PropTypes.object,
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  scorerCard: {
    marginBottom: 20,
  },
  scorer: {
    display: 'flex',
    border: '1px solid #ddd',
  },
  scoreChangerBtn: {
    minWidth: 'auto', // undo mui default
    width: 75,
    height: 'auto',
    borderLeft: '1px solid rgba(0,0,0, .25)',
    borderRight: '1px solid rgba(0,0,0, .25)',
    borderRadius: 0,
    backgroundColor: '#fafafa',
  },
  scoreDisplay: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 0',
  },
  scoreDisplayWinner: {
    backgroundColor: colors.green,
    color: '#fff',
    boxShadow: `0 1px 0 0 ${darken(colors.green, 0.25)}, 0 0 0 1px ${darken(colors.green, 0.2)}`,
    zIndex: 1,
  },
  playerName: {
    fontSize: 20,
    marginBottom: 10,
  },
  playerScore: {
    fontSize: 50,
  },
  markCompleteButton: {
    marginTop: 15,
  },
  completeMatchBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
  },
  matchCompleteText: {
    color: colors.green,
    fontWeight: 'bold',
    margin: '8px 0',
  },
  backButton: {
    height: 38,
    padding: 0,
  },
});
