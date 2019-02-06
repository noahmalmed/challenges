import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PatientContainer from './PatientContainer';

const PatientHome = ({ patientId }) =>
  <PatientContainer patientId={patientId} />;

PatientHome.propTypes = {
  patientId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  patientId: state.user.data.id,
});

export default connect(mapStateToProps)(PatientHome);
