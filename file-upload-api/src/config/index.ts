
let dbString = '';
if (!process.env.dbConnection) {
    dbString = require('./dev/config').dbConnection;
}else{
    dbString = process.env.dbConnection
}

export const dbConnection = dbString;
