import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import PatientList from '../components/PatientList';
import { getAllPatients } from '../actions/patients';

const styles = {
  welcomeMessage: {
    color: 'black',
  },
  searchWrapper: {
    padding: '5px 10px',
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7,
  },
  search: {
    fontSize: 11,
  },
  patients: {
    marginTop: 40,
  },
};

class DoctorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }
  componentDidMount() {
    this.props.loadPatients();
  }

  render() {
    const { classes, patients } = this.props;
    return (
      <div className="container">
        <h2 className={classes.welcomeMessage}>Welcome back, Dr. McGonagall.</h2>
        <div className={classes.patients}>
          { patients ?
            <div>
              <Card className={classes.searchWrapper}>
                <Icon className={classes.searchIcon}>search</Icon>
                <TextField
                  name="search"
                  placeholder="Search patients"
                  className={classes.search}
                  inputProps={{ style: { fontSize: 12 } }}
                  onChange={(event) => this.setState({ searchQuery: event.target.value.toLowerCase() })}
                />
              </Card>
              <PatientList searchQuery={this.state.searchQuery} patients={patients} />
            </div>
              : <div>{'You don\'t have any patients.'}</div>
            }
        </div>
      </div>
    );
  }
}

DoctorHome.propTypes = {
  classes: PropTypes.object.isRequired,
  patients: PropTypes.array,
  loadPatients: PropTypes.func,
};

const mapStateToProps = (state) => ({
  patients: state.patients.data,
});

const mapDispatchToProps = (dispatch) => ({
  loadPatients: () => {
    dispatch(getAllPatients());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DoctorHome));
