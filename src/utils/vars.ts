export const DATA_SOURCES = {
  mySqlDataSource: {
   // DB_HOST: 'pe-awai.cluster-ro-cng8u5rib7j2.us-east-1.rds.amazonaws.com'
    DB_HOST: 'pe-awai.cluster-cng8u5rib7j2.us-east-1.rds.amazonaws.com',//process.env.MY_SQL_DB_HOST,
    DB_USER: 'awaiuser',//process.env.MY_SQL_DB_USER,
    DB_PASSWORD: 'awai123',//process.env.MY_SQL_DB_PASSWORD,
    DB_PORT: '3306',//process.env.MY_SQL_DB_PORT,
    DB_DATABASE: 'awai',
    DB_CONNECTION_LIMIT: 10 //process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
  }
};