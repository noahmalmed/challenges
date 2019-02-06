import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { DateField } from 'react-date-picker';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import InputLabel from 'material-ui/Input/InputLabel';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getDoctors } from '../actions/doctors';
import { addRequestedAppointment } from '../actions/appointments';
import 'react-date-picker/index.css';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
  },
  formRow: {
    minWidth: 200,
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 12,
  },
  doctorSelect: {
    flex: 1,
  },
  formControl: {
    minWidth: 120,
  },
};

class NewApptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '', // eslint-disable-line react/no-unused-state
      selectedDoctorId: '',
      purpose: '',
    };

    this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadDoctors();
  }

  handleRequestSubmit() {
    const { dateString, selectedDoctorId, purpose } = this.state;
    const { doctors, patientId, history } = this.props;
    const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);
    const date = new Date(dateString);
    const shouldRequest = confirm( `Submit an appointment request on ${date} with Dr. ${selectedDoctor.lastName}?`);
    if (shouldRequest) {
      this.props.requestAppointment(date, patientId, selectedDoctorId, purpose)
        .then(() => {
          history.push('/');
        });
    }
  }

  render() {
    const { classes, doctors } = this.props;
    const { dateString, selectedDoctorId, purpose } = this.state;
    return (
      <div className="container">
        <div>
          <h2>Request an Appointment</h2>
        </div>
        <form className={classes.form}>
          <div className={classes.formRow}>
            <div className={classes.pickerLabel}>Date</div>
            <DateField
              minDate={new Date()}
              dateFormat="YYYY-MM-DD hh:mm a"
              onChange={(value) => this.setState({ dateString: value })}
              value={dateString}
            />
          </div>
          <div className={classes.formRow}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="doctor-simple">Doctor</InputLabel>
              <Select
                inputProps={{
                  name: 'doctor',
                  id: 'doctor-simple',
                }}
                className={classes.doctorSelect}
                value={selectedDoctorId}
                onChange={(event) => this.setState({ selectedDoctorId: event.target.value })}
              >
                {
                  doctors.map(({ id, lastName }) => (
                    <MenuItem key={id} value={id}>{`Dr. ${lastName}`}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className={classes.formRow}>
            <TextField
              id="purpose"
              label="Purpose Of Visit"
              value={purpose}
              onChange={(event) => this.setState({ purpose: event.target.value })}
              margin="normal"
            />
          </div>
          <Button
            variant="raised"
            color="primary"
            disabled={_.isEmpty(selectedDoctorId) || selectedDoctorId === '-' || _.isEmpty(dateString) || _.isEmpty(purpose)}
            onClick={this.handleRequestSubmit}
          >
            Submit Request
          </Button>
        </form>
      </div>
    );
  }
}


NewApptRequest.propTypes = {
  classes: PropTypes.object.isRequired,
  doctors: PropTypes.array,
  patientId: PropTypes.string,
  loadDoctors: PropTypes.func,
  requestAppointment: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  doctors: state.doctors.data,
  patientId: state.patient.data.id,
});

const mapDispatchToProps = (dispatch) => ({
  loadDoctors: () => {
    dispatch(getDoctors());
  },
  requestAppointment: (date, patientId, doctorId, purpose) =>
    dispatch(addRequestedAppointment(date, patientId, doctorId, purpose)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewApptRequest)));
