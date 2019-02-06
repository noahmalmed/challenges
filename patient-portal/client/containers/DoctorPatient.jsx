import React from 'react';
import PatientContainer from './PatientContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Patient = ({ match, doctorId }) => (
  <PatientContainer
    patientId={match.params.id}
    appointmentFilter={(appointment) => appointment.doctor_id === doctorId}
  />
);

Patient.propTypes = {
  match: PropTypes.object,
  doctorId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  doctorId: state.user.data.id,
});

export default connect(mapStateToProps)(Patient);
