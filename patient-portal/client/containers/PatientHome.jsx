import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import PatientView from '../components/PatientView';
import { getPatientData } from '../actions/patients';

const styles = {
  header: {
    textAlign: 'center',
  },
};

class PatientHome extends Component {
  componentDidMount() {
    this.props.loadPatientData(this.props.user.id);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <h3 className={this.props.classes.header}> Loading Patient Data </h3>
        </div>
      );
    }
    return (
      <PatientView
        patientData={this.props.patientData}
      />
    );
  }
}

PatientHome.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  patientData: PropTypes.object,
  loadPatientData: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  isSuccess: state.patient.isSuccess,
  isLoading: state.patient.isLoading,
  isFail: state.patient.isFail,
  patientData: state.patient.data,
  user: state.user.data,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loadPatientData: (patientId) => {
    dispatch(getPatientData(patientId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientHome));
