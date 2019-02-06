import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';

import PatientView from '../components/PatientView';
import { getPatientData } from '../actions/patients';
import { cancelAppointment, confirmAppointment } from '../actions/appointments';

const styles = {
  header: {
    textAlign: 'center',
  },
};

class PatientContianer extends Component {
  constructor(props) {
    super(props);

    this.onAppointmentCancelRequest = this.onAppointmentCancelRequest.bind(this);
    this.onAppointmentConfirmRequest = this.onAppointmentConfirmRequest.bind(this);
  }

  componentDidMount() {
    this.props.loadPatientData(this.props.patientId);
  }

  onAppointmentCancelRequest(apptId) {
    this.props.cancelAppointment(apptId);
  }

  onAppointmentConfirmRequest(apptId) {
    this.props.confirmAppointment(apptId);
  }

  render() {
    const {
      patientData,
      isLoading,
      isSuccess,
      classes,
      appointmentFilter,
    } = this.props;

    if (isLoading || !isSuccess ) {
      return (
        <div className="container">
          <h3 className={classes.header}> Loading Patient Data </h3>
        </div>
      );
    }

    const patientDataWithFilteredAppointments =
      _.set(patientData, 'appointments', patientData.appointments.filter(appointmentFilter));

    return (
      <PatientView
        patientData={patientDataWithFilteredAppointments}
        onAppointmentCancelRequest={this.onAppointmentCancelRequest}
        onAppointmentConfirmRequest={this.onAppointmentConfirmRequest}
        role={this.props.role}
      />
    );
  }
}

PatientContianer.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  role: PropTypes.string,
  patientData: PropTypes.object,
  loadPatientData: PropTypes.func,
  cancelAppointment: PropTypes.func,
  confirmAppointment: PropTypes.func,
  patientId: PropTypes.string,
  appointmentFilter: PropTypes.func,
};

PatientContianer.defaultProps = {
  appointmentFilter: () => true,
};

const mapStateToProps = (state) => ({
  isSuccess: state.patient.isSuccess,
  isLoading: state.patient.isLoading,
  isFail: state.patient.isFail,
  patientData: state.patient.data,
  role: state.user.data.role,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loadPatientData: (patientId) => {
    dispatch(getPatientData(patientId));
  },
  cancelAppointment: (appointmentId) => {
    dispatch(cancelAppointment(appointmentId));
  },
  confirmAppointment: (appointmentId) => {
    dispatch(confirmAppointment(appointmentId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientContianer));
