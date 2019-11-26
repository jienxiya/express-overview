var mysql = require('mysql')
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
var Pusher = require('pusher')


app.get('/', (req, res) => {
    res.json({
        title: 'Hello World',
        date: 'Today'
    })
})

// pusher
app.post('/pusher', (req, res) => {
   var data = {
        "data": req.query
   }
   var pusher = new Pusher({
      appId: '906630',
      key: '19f814902a00899fa4c5',
      secret: 'f4d20401c2e102900b46',
      cluster: 'ap1',
      encrypted: true
    });
       pusher.trigger('my-channel', 'my-event', data); 
       res.json({
        message: 'Successful'
    })
})

app.post('/user', (req, res) => {
    res.json({
        username: 'Yeo',
        email: 'yeo@gmail.com',
        password: null
    })
})

app.get('/db/retrieve/:username', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'midterms'
    })

    connection.connect()

    connection.query(`SELECT * FROM accounts where username = '${req.params.username}'`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

app.get('/db/create/:username/:email/:password', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'midterms'
    })

    connection.connect()
    connection.query(`INSERT INTO accounts (username,email,password) VALUES ('${req.params.username}','${req.params.email}', '${req.params.password}')`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

app.get('/db/update/:username/:email/:password', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'midterms'
    })

    connection.connect()
    connection.query(`UPDATE accounts SET username='${req.params.username}',email='${req.params.email}',password='${req.params.password}' WHERE id=1`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

app.get('/db/delete', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'midterms'
    })

    connection.connect()
    connection.query(`DELETE FROM accounts WHERE id=1`, function (err, rows, fields) {
        if (err) throw err

        // console.log('The solution is: ', rows[0].solution)
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

//MIDTERMS
app.get('/db/create/:post_id/:user_id/:user_post/:username', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'midterms'
    })

    connection.connect()
    connection.query(`INSERT INTO posts (post_id,user_id,user_post,username) VALUES ('${req.params.user_post}')`, function (err, rows, fields) {
        if (err) throw err  
        res.json({
            data:rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))