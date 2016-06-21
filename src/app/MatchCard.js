import React, { Component, PropTypes } from 'react';
import Card from './Card.js';
import prettyPrintDate from '../utils/datePrettyPrinter.js';
import * as colors from '../utils/colors.js';
import { StyleSheet, css } from 'aphrodite';

export default class MatchCard extends Component {
  renderPlayer(idx, player, winnerIdx) {
    const isWinner = idx === winnerIdx;
    const isOnLeft = idx === 0;

    const boxStyles = [
      styles.player,
      isWinner && styles.greenBg,
    ];
    const nameStyles = [
      styles.playerName,
      isWinner && styles.whiteText,
    ];
    const scoreStyles = [
      styles.playerScore,
      isWinner && styles.whiteText,
    ];
    const wedgeStyles = [
      styles.wedge,
      isOnLeft ? styles.wedgeOnLeft : styles.wedgeOnRight,
    ];
    const wedgeBarLeftStyles = [
      styles.wedgeBar,
      isOnLeft && styles.greenBg,
    ];
    const wedgeBarRightStyles = [
      styles.wedgeBar,
      !isOnLeft && styles.greenBg,
    ];

    return (
      <div key={idx} className={css(...boxStyles)}>
        <div className={css(...nameStyles)}>
          {player.name}
        </div>
        <div className={css(...scoreStyles)}>
          {player.score}
        </div>
        {isWinner && (
          <div className={css(...wedgeStyles)}>
            <div className={css(...wedgeBarLeftStyles)} />
            <div className={css(...wedgeBarRightStyles)} />
          </div>
        )}
      </div>
    );
  }

  handleClick = () => {
    this.context.router.push(`/match/${this.props.match.id}`);
  }

  render() {
    const { match } = this.props;

    let winnerIdx;
    if (match.isComplete) {
      winnerIdx = (match.players[0].score > match.players[1].score) ? 0 : 1;
    }

    return (
      <div onClick={this.handleClick} key={match.id} className={css(styles.card)}>
        <Card>
          <div className={css(styles.playersBox)}>
            {match.players.map((player, idx) =>
              this.renderPlayer(idx, player, winnerIdx))}
            <div className={css(styles.cover)} />
          </div>
          <div className={css(styles.footer)}>
            <div>
              {match.isComplete ? 'Complete' : 'In Progress'}
            </div>
            <div className={css(styles.time)}>
              {prettyPrintDate(new Date(match.creationTimestamp))}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

MatchCard.contextTypes = {
  router: PropTypes.object
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: '100%',
    ':hover': {
      cursor: 'pointer',
    }
  },
  player: {
    width: '50%',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  playerName: {
    fontSize: 20,
    color: '#818181',
  },
  playerScore: {
    color: '#333',
    fontSize: 45,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 5,
  },
  wedge: {
    position: 'absolute',
    top: '-5%',
    width: 30,
    right: -15,
    height: '110%',
    transform: 'rotate(11deg)',
    display: 'flex',
  },
  wedgeOnLeft: {
    left: 'auto',
    right: -15,
  },
  wedgeOnRight: {
    left: -15,
    right: 'auto',
  },
  wedgeBar: {
    height: '100%',
    width: 15,
    backgroundColor: '#fff',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    color: '#999',
  },
  time: {
    fontSize: 14,
  },
  playersBox: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },
  cover: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0, .15)',
    zIndex: 1,
  },
  whiteText: {
    color: '#fff',
  },
  'greenBg': {
    backgroundColor: colors.green,
  },
});
