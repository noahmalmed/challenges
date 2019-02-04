import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
