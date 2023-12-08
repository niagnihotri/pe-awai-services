export const DATA_SOURCES = {
  mySqlDataSource: {
    DB_HOST: 'pe-awai-services.cng8u5rib7j2.us-east-1.rds.amazonaws.com',//process.env.MY_SQL_DB_HOST,
    DB_USER: 'admin',//process.env.MY_SQL_DB_USER,
    DB_PASSWORD: 'Admin123',//process.env.MY_SQL_DB_PASSWORD,
    DB_PORT: '3306',//process.env.MY_SQL_DB_PORT,
    DB_DATABASE: 'pe-awai-services',
    DB_CONNECTION_LIMIT: 10 //process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
  }
};