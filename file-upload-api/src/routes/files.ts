import { Router, RequestHandler, Response, Request } from 'express';
import { ParsedAsJson } from 'body-parser'
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

router.post('/upload',blobStorage.uploadHandler.single('document'), (req, res) => {
//     console.log('uploading start')
    let fileName = req.file.blobName;

    let newPerson = new ProfileRecord();
    newPerson = Object.assign(newPerson, { fileName,...req.body });

     newPerson.save()
      .then((data) => res.json({ info: 'person created successfully' + data }))
//      .catch((err) => res.json({ info: 'error during Person create', error: err }));
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