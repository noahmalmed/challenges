import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import Appointments from '../components/Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';
import {
  getUpcomingAppointments,
  getPastAppointments,
  getPendingAppointments,
} from '../utils/appointmentUtils';

import { patient, pendingAppts, pastAppts, files } from '../dummyData';

const styles = {
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 12,
  },
};

const PatientView = ({ classes, patientData }) => {
  return (
    <div className="container">
      <h2>{ `Welcome back, ${patientData.firstName} ${patientData.lastName}.` }</h2>
      <div className="profile">
        <div>
          <h3>Your Profile</h3>
          <PatientDetails patient={patientData} />
        </div>
        <div className={classes.buttonWrapper}>
          <Button variant="raised" color="primary">
            <Link to="/request-appointment" className={classes.button}>Request Appointment</Link>
          </Button>
        </div>
      </div>
      <div>
        <h3>Upcoming Appointments</h3>
        <Appointments
          appointments={getUpcomingAppointments(patientData.appointments)}
          type="upcoming"
          viewer="patient"
        />
        <h3>Pending Appointments</h3>
        <Appointments
          appointments={getPendingAppointments(patientData.appointments)}
          type="pending"
          viewer="patient"
        />
        <h3>Past Appointments</h3>
        <Appointments
          appointments={getPastAppointments(patientData.appointments)}
          type="past"
          viewer="patient"
        />
      </div>
      <div>
        <h3>Your Files</h3>
        <Files files={files} />
      </div>
    </div>
  );
};

PatientView.propTypes = {
  classes: PropTypes.object.isRequired,
  patientData: PropTypes.shape({

  })
};

export default withStyles(styles)(PatientView);
