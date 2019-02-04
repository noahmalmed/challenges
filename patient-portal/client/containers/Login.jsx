import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogInForm from '../components/LogInForm';

const Login = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <LogInForm />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(Login);
