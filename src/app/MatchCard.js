import React, { Component, PropTypes } from 'react';
import Card from './Card.js';
import prettyPrintDate from '../utils/datePrettyPrinter.js';
import * as colors from '../utils/colors.js';

export default class MatchCard extends Component {
  renderPlayer(idx, player, winnerIdx) {
    const isWinner = idx === winnerIdx;
    const isOnLeft = (idx === 0);

    const boxStyle = isWinner ?
      {...styles.player, backgroundColor: colors.green} :
      styles.player;
    const nameStyle = isWinner ?
      {...styles.playerName, color: '#fff'} :
      styles.playerName;
    const scoreStyle = isWinner ?
      {...styles.playerScore, color: '#fff'} :
      styles.playerScore;
    const wedgeStyle = {
      ...styles.wedge,
      left: isOnLeft ? 'auto' : -15,
      right: isOnLeft ? -15 : 'auto',
    };
    const wedgeBarLeftStyle = {
      ...styles.wedgeBar,
      backgroundColor: isOnLeft ? colors.green : '#fff',
    };
    const wedgeBarRightStyle = {
      ...styles.wedgeBar,
      backgroundColor: isOnLeft ? '#fff' : colors.green,
    };

    return (
      <div key={idx} style={boxStyle}>
        <div style={nameStyle}>
          {player.name}
        </div>
        <div style={scoreStyle}>
          {player.score}
        </div>
        {isWinner && (
          <div style={wedgeStyle}>
            <div style={wedgeBarLeftStyle} />
            <div style={wedgeBarRightStyle} />
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
      <div onClick={this.handleClick} key={match.id} style={styles.card}>
        <Card>
          <div style={styles.playersBox}>
            {match.players.map((player, idx) =>
              this.renderPlayer(idx, player, winnerIdx))}
            <div style={styles.cover} />
          </div>
          <div style={styles.footer}>
            <div>
              {match.isComplete ? 'Complete' : 'In Progress'}
            </div>
            <div style={styles.time}>
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

const styles = {
  card: {
    marginBottom: 20,
    width: '100%'
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
  wedgeBar: {
    height: '100%',
    width: 15,
  },
};
