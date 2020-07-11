var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index',{
    name: 'Canh'
}))

var  users = [
    {id: 1, name: 'Canh'},
    {id: 2, name: 'Anh'},
    {id: 3, name: 'Nhu'}
]

app.get('/users', (req, res) => res.render('users/index',{
   users : db.get('users').value()
}))



app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  
    res.render('users/index', {
      users: matchedUsers
    });
  });

app.get('/users/create', function(req, res){
    res.render('users/create');
})

app.post('/users/create',function(req, res){
    db.get('users').push(req.body).write();
    res. redirect('/users')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))