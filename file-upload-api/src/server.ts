import  * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

var app: express.Server = express();

app.use(cors());
app.use(bodyParser.json());


//routes
import routes from './routes/files';
routes(app);

//datastore
import { dbConnection } from './config';
mongoose.connect(dbConnection);
console.log(dbConnection);
//setup static files
app.use(express.static('../public'))

console.error('test');

var server = app.listen(3002, function () {
    console.log('Server running at http://127.0.0.1:3002/');
});