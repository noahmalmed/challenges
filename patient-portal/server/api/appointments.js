import { Router } from 'express';
import Api from '../db/db-api';
import _ from 'lodash';

export default Router()
  .get('/', async (req, res) => {
    const result = await Api.Appointment.get();
    res
      .status(result.error ? 200 : 500)
      .send(result);
  })

  .get('/:id', async (req, res) => {
    const result = await Api.Appointment.get({ id: req.params.id });
    res
      .status(result.error ? 200 : 500)
      .send(result);
  })

  .get('/patient/:patientId', async (req, res) => {
    const result = await Api.Appointment.get({ patient_id: req.params.patient_id });
    res
      .status(result.error ? 200 : 500)
      .send(result);
  })

  .post('/', async (req, res) => {
    const result = await Api.Appointment.create(req.body);
    res
      .status(_.isEmpty(result.error) ? 200 : 500)
      .send(result);
  })

  .put('/:id', async (req, res) => {
    const result = await Api.Appointment.update(req.params.id, req.body);
    res
      .status(_.isEmpty(result.error) ? 200 : 500)
      .send(result);
  })

  .delete('/:id', async (req, res) => {
    const result = await Api.Appointment.destroy(req.params.id);
    res
      .status(_.isEmpty(result.error) ? 200 : 500)
      .send(result);
  });
