import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

const styles = {
  card: {
    marginBottom: 15,
    width: 400,
  },
  marginBottom: {
    marginBottom: 15,
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 13,
    fontWeight: 600,
  },
  action: {
    fontSize: 12,
  },
  cancelButton: {
    marginLeft: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

const convertDateTime = (dateTime) =>
  moment(dateTime).format('dddd, MMMM D, YYYY, hh:mm A');

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      message: '',
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const {
      appt,
      classes,
      viewer,
      isCancelable,
      onAppointmentCancelRequest,
      onAppointmentConfirmRequest,
    } = this.props;

    return (
      <Card
        key={appt.datetime}
        className={classes.card}
      >
        <CardContent>
          <div className={classes.content}>
            <div>
              <div className={classes.headerContainer}>
                <div className={classes.header}>
                  {convertDateTime(appt.datetime)}
                </div>
                { isCancelable && viewer === 'patient' &&
                  <div className={classes.cancelButton}>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={() => onAppointmentCancelRequest(appt.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                }
              </div>
              <div>
                {appt.purpose}
              </div>
            </div>
          </div>
        </CardContent>
        <Divider />
        {
          appt.status === 'pending' && viewer === 'doctor' ?
            <CardContent>
              <div>
                <div className={classes.header}>Message to Patient</div>
                <form>
                  <div className={classes.marginBottom}>
                    <TextField
                      name="message"
                      onChange={this.onMessageChange}
                      value={this.state.message}
                      inputProps={{ style: { fontSize: 11 } }}
                      multiline
                      fullWidth
                    />
                  </div>
                  <div className={classes.buttonContainer}>
                    <Button
                      onClick={() => onAppointmentCancelRequest(appt.id)}
                      variant="raised"
                      color="primary"
                      className={classes.action}
                    >
                      Decline Request
                    </Button>
                    <Button
                      onClick={() => onAppointmentConfirmRequest(appt.id)}
                      variant="raised"
                      color="primary"
                      className={classes.action}
                    >
                      Accept Request
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent> : null
        }
      </Card>
    );
  }
}

Appointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
  viewer: PropTypes.oneOf(['patient', 'doctor']),
  isCancelable: PropTypes.bool,
  onAppointmentCancelRequest: PropTypes.func,
  onAppointmentConfirmRequest: PropTypes.func,
};

export default withStyles(styles)(Appointment);
