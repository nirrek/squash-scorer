import React, { Component, PropTypes } from 'react';
import noop from 'lodash/noop';
import * as colors from '../utils/colors.js';

const propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default class Button extends Component {
  render() {
    return (
      <button style={buttonStyles} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = propTypes;

Button.defaultProps = {
  onClick: noop,
};

const buttonStyles = {
  border: 'none',
  backgroundColor: colors.green,
  borderRadius: 4,
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 15,
  padding: '10px 14px',
};
