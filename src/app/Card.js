import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  render() {
    const { style, children } = this.props;

    return (
      <div style={{...styles.card, ...style}}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  card: {
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)'
  }
};
