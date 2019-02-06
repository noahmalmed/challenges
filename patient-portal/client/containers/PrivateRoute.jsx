import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  userType,
  authenticatedRole,
  ...restOfProps
}) => (
  <Route
    {...restOfProps}
    render={(props) => {
      if (isAuthenticated && (userType === authenticatedRole || userType === 'both')) {
        return <Component {...props} />;
      } else if (isAuthenticated && userType !== authenticatedRole) {
        return <Redirect to="/" />;
      }

      return <Redirect to="/login" />;
    }}
  />
);


PrivateRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  userType: PropTypes.oneOf(['doctor', 'patient', 'both']),
  authenticatedRole: PropTypes.oneOf(['doctor', 'patient']),
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  authenticatedRole: _.get(state, 'user.data.role', null),
});

export default connect(mapStateToProps)(PrivateRoute);
