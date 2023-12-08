var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : "pe-awai-services",//process.env.RDS_HOSTNAME,
  user     : "admin",//process.env.RDS_USERNAME,
  password : "Admin123",//process.env.RDS_PASSWORD,
  port     : "3306" //process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();