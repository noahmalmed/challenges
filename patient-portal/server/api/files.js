import { Router } from 'express';
import Api from '../db/db-api';
import fileUpload from 'express-fileupload';
import _ from 'lodash';

export default Router()
  .use(fileUpload())

  .post('/:patientId', async (req, res) => {
    const { file } = req.files;
    const filepath = `${__dirname}/../../public/uploads/${file.name}`;

    file.mv(
      filepath,
      async (err) => {
        if (err) {
          res.status(500).send();
        } else {
          const result = await Api.File.create({
            patient_id: req.params.patientId,
            name: file.name,
            filepath,
          });
          res
            .status(_.isEmpty(result.error) ? 200 : 500)
            .send();
        }
      },
    );
  })

  .get('/', async (req, res) => {
    const result = await Api.File.get();
    res
      .status(result.error ? 200 : 500)
      .send(result);
  })

  .get('/:patientId', async (req, res) => {
    const result = await Api.File.get({ patient_id: req.params.patientId });
    res
      .status(_.isEmpty(result.error) ? 200 : 500)
      .send(result);
  });
