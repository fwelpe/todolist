var mysql = require('mysql')
function getData() {
    var connection = mysql.createConnection({
      host: '95.165.129.236',
      user: 'root',
      password: 'ewe4',
      database: 'todolist'
    });

    connection.connect()

    connection.query('SELECT * FROM todolist', function (err, rows, fields) {
    //   if (err) throw err

      console.log('The solution is: ', rows)
    })

    connection.end()
  }

  export default getData