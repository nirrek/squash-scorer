import React, { Component, PropTypes } from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import cuid from 'cuid';
import map from 'lodash/map';
import identity from 'lodash/identity';
import Button from './Button.js';
import AppBar, { AppBarActions, AppBarTitle } from './AppBar.js';

export default class NewMatch extends Component {
  state = {
    playerName1: {
      value: '',
      errorText: '',
    },
    playerName2: {
      value: '',
      errorText: '',
    }
  }

  render() {
    const { playerName1, playerName2 } = this.state;

    return (
      <div>
        <AppBar>
          <AppBarActions>
            <IconButton
              style={{ height: 38, padding: 0 }}
              onClick={this.handleClose}>
              <Close color='#333' />
            </IconButton>
          </AppBarActions>
          <AppBarTitle>Start a New Match</AppBarTitle>
          <AppBarActions>
            <Button label="DONE" onClick={this.handleDone} />
          </AppBarActions>
        </AppBar>

        <div style={styles.body}>
          <TextField
            floatingLabelText="Name of player 1"
            value={playerName1.value}
            errorText={playerName1.errorText}
            style={styles.textField}
            onChange={event => this.updateField('playerName1', event.target.value)}
            onBlur={() => this.validateField('playerName1')} />
          <TextField
            floatingLabelText="Name of player 2"
            value={playerName2.value}
            errorText={playerName2.errorText}
            style={styles.textField}
            onChange={event => this.updateField('playerName2', event.target.value)}
            onBlur={() => this.validateField('playerName2')} />

        </div>
      </div>
    );
  }

  handleClose = () => this.context.router.push('/');

  handleDone = () => {
    if (!this.validateAllFields()) return;

    const id = cuid();
    this.props.upsert({
      id,
      creationTimestamp: Date.now(),
      isComplete: false,
      players: [
        { name: this.state.playerName1.value, score: 0 },
        { name: this.state.playerName2.value, score: 0 },
      ],
    });

    this.context.router.replace(`/match/${id}`);
  }

  updateField = (fieldName, value) => {
    this.setState({ [fieldName]: { value } });
  };

  // validateAllFields :: () -> boolean   # IMPURE #
  // Updates the state for each field with their corresponding validation message.
  // Produces true if all fields are valid, false otherwise.
  validateAllFields = () => Object.keys(this.state)
    .map(this.validateField)
    .every(identity);

  // validateField :: string -> boolean   # IMPURE #
  // Updates the state for the given fieldName with the validation message.
  // Produces true if the fieldName is valid; false otherwise.
  validateField = (fieldName) => {
    const value = this.state[fieldName].value;
    const errorText = this.validateName(value);
    this.setState({ [fieldName]: { value, errorText } });

    return errorText === '';
  }

  validateName = (name) => {
    if (name === '') {
      return 'You need to give the player a name';
    }
    return '';
  }

}

NewMatch.contextTypes = {
  router: PropTypes.object,
};

const styles = {
  body: {
    padding: 20,
  },
  textField: {
    width: '100%',
  }
};
