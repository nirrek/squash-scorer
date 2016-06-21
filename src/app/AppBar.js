import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class AppBar extends Component {
  render() {
    return (
      <div className={css(styles.header)}>
        {this.props.children}
      </div>
    );
  }
}

export const AppBarTitle = ({ children }) => (
  <div className={css(styles.headerTitle)}>
    {children}
  </div>
);

export const AppBarActions = ({ children }) => (
  <div className={css(styles.headerAction)}>
    {children}
  </div>
);

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    backgroundColor: '#fafafa',
    boxShadow: '0 1px 4px rgba(0,0,0,.15), 0 0px 1px rgba(0,0,0,.3)',
    color: '#333',
    fontSize: 17,
  },
  headerTitle: {
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 500,
  },
  headerAction: {
    padding: '0 10px',
  },
});
