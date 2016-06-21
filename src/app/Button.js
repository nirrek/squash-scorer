import React, { Component, PropTypes } from 'react';
import noop from 'lodash/noop';
import * as colors from '../utils/colors.js';
import { StyleSheet, css } from 'aphrodite';
import { emphasize } from 'material-ui/utils/colorManipulator';

const propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default class Button extends Component {
  render() {
    return (
      <button className={css(styles.button)} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = propTypes;

Button.defaultProps = {
  onClick: noop,
};

const styles = StyleSheet.create({
  button: {
    border: 'none',
    backgroundColor: colors.green,
    borderRadius: 4,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: '10px 14px',
    transition: 'background-color 300ms ease-out',
    ':hover': {
      backgroundColor: emphasize(colors.green, 0.08),
      cursor: 'pointer',
    },
    ':focus': {
      outline: 'none',
    },
  },
});
