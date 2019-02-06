import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { signOut } from '../actions/auth';

const styles = {
  container: {
    display: 'flex',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
  },
  authenticationView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  displayName: {
    margin: 15,
  },
};

const Navbar = ({ classes, isAuthenticated, displayName, signOut, history }) => (
  <AppBar className={classes.container}>
    <Toolbar>
      <Button><Link to="/" className={classes.button}>Home</Link></Button>
      {
        isAuthenticated &&
          <div className={classes.authenticationView}>
            <p className={classes.displayName}> { displayName } </p>
            <Button
              className={classes.button}
              onClick={() => {
                signOut();
                history.push('/login');
              }}
            >
              Sign Out
            </Button>
          </div>
      }
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  displayName: PropTypes.string,
  signOut: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  const firstName = get(state, 'user.data.firstName', '');
  const lastName = get(state, 'user.data.lastName', '');
  return {
    isAuthenticated: state.user.isAuthenticated,
    displayName: `${firstName} ${lastName}`,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(signOut);
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));
