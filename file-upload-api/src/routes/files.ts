import { Router, RequestHandler, Response, Request } from 'express';
import { ParsedAsJson } from 'body-parser'
import * as Busboy from 'busboy';
import * as path from 'path';
import * as blobStorage from '../services/blobStorage';
import { ProfileRecord } from '../models/profile';
import * as guid from 'guid';
import * as requestPromise from 'request-promise';

const router = Router();

router.get('/', (req, res: Response, next) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

router.get('/applications', (req, res: Response) => {
  ProfileRecord.find({}).exec()
    .then((data) => res.json(data));

});

router.get('/file/:container/:image', (req: Request, res: Response) => {

  const options: requestPromise.OptionsWithUri = {
    method: 'POST',
    uri: 'http://localhost:7071/api/SaSTokenService',
    body: {
      container: req.params.container,
      blobName: req.params.image
    },
    json: true
  };

  requestPromise(options)
    .then((data) => res.json(data))
    .catch((data) => res.status(500).send(data))

});
router.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  let newPerson = new ProfileRecord();

  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
    newPerson[fieldname] = val;
  });

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('uploading start')
    let fileName = `${guid.create()}-${filename}`;

    newPerson = Object.assign(newPerson, { fileName });

    blobStorage
      .saveToBlob(fileName, file)
      .then((data) => newPerson.save())
      .then((data) => res.json({ info: 'person created successfully' + data }))
      .catch((err) => res.json({ info: 'error during Person create', error: err }));
  });

  req.pipe(busboy);
});

router.delete('/applications/:id', (req: Request, res: Response) => {

  ProfileRecord.findByIdAndRemove(req.params.id)
    .exec()
    .then((data) => res.json(data));

});

const files = (app) => {
  app.use('/', router);
};

export default files;