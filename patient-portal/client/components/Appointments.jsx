import React from 'react';
import PropTypes from 'prop-types';

import Appointment from './Appointment';

const Appointments = ({
  appointments,
  type,
  viewer,
  onAppointmentCancelRequest,
  onAppointmentConfirmRequest,
}) => (
  <div>
    {
      appointments.length === 0 ?
        <p> { `You have no ${type} appointments` } </p>
      :
        appointments.map((appt) => (
          <Appointment
            viewer={viewer}
            key={appt.id}
            appt={appt}
            isCancelable={type === 'upcoming' || type === 'pending'}
            onAppointmentCancelRequest={onAppointmentCancelRequest}
            onAppointmentConfirmRequest={onAppointmentConfirmRequest}
          />
        ))
    }
  </div>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.oneOf(['upcoming', 'pending', 'past']),
  viewer: PropTypes.oneOf(['patient', 'doctor']),
  onAppointmentCancelRequest: PropTypes.func,
  onAppointmentConfirmRequest: PropTypes.func,
};

export default Appointments;
