const environment = process.env.NODE_ENV || 'dev';


 
let dbString = '';
if (environment === 'dev') {
    const config = require('./dev/config');

    dbString = config.dbConnection;

}else{
    dbString = process.env.dbConnection
}

export const dbConnection = dbString;
