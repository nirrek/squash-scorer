import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class Card extends Component {
  render() {
    const { style, className, children } = this.props;
    const classes = `${css(styles.card)} ${className}`;

    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  card: {
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)'
  },
});
