import { Router } from 'express';
import Api from '../db/db-api';

export default Router()
  .get('/', async (req, res) => {
    const result = await Api.Address.get();
    res
      .status(result.error ? 200 : 500)
      .send(result);
  })

  .get('/:id', async (req, res) => {
    const result = await Api.Address.get({ id: req.params.id });
    res
      .status(result.error ? 200 : 500)
      .send(result);
  });
