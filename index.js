const express = require('express')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index',{
    name: 'Canh'
}))

var  users = [
    {id: 1, name: 'Canh'},
    {id: 2, name: 'Anh'}
]

app.get('/users', (req, res) => res.render('users/index',{
   users : users
}))



app.get('/users/search',function(req, res){
    var q = req.query.q;
    var MatchedUsers = users.filter(function(users){
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users : MatchedUsers
     })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))