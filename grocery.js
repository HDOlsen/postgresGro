//psql database name = grocery; role = groceryrole; password = 'Freddy25'
// loading the module
const express = require('express')
const app = express()
//var session = require('express-session')
const promise = require('bluebird') //provides a promose-pg architecture

let options =
{
  promiseLib: promise
} //specifies that bluebird is used as promise library

let pgp = require('pg-promise')(options)
let connectionString = 'postgres://localhost:5432/grocery'
let db = pgp(connectionString)


console.log(db)

//variables
//let groceries = []

// setting up middleware to use the session
//app.use(session({
  //secret: 'guest',
  //resave: true,
 // saveUninitialized: true
//}))

// body parser for parsing JSON
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//

// this means localhost:3000/site.css will work
app.use(express.static('styles'))


var mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')

app.set('views', './views')


//Working with Grocery List Post


app.get('/lists',function(req,res){
    db.any('SELECT * FROM lists').then(function(data){
        // res.render(page to render, object to pass to the page)
        res.render('lists',{'groceryList' : data})
})

    db.any('SELECT * FROM items').then(function(data){
      // res.render(page to render, object to pass to the page)
     res.render('lists',{'groceryList' : data})
  })
})
  
  app.post('/viewlists',function(req,res){
  
    let name = req.body.name

    let delId = guid()

    let item = req.body.item

    let quantity = req.body.quantity

    let price = req.body.price

    db.none('INSERT INTO lists(name, delId) values($1, $2)',[name, delId]).then(function(){
    
        db.any('SELECT * FROM lists').then(function(data){
            // res.render(page to render, object to pass to the page)
            res.render('viewlists',{'groceryList' : data})
        })
    })

    db.none('INSERT INTO items(item, quantity, price) values($1, $2, $3)',[item, quantity, price]).then(function(){
    
      db.any('SELECT * FROM items').then(function(data){
          // res.render(page to render, object to pass to the page)
          res.render('viewlists',{'groceryList' : data})
      })
  })
  })

      //  trips.push({title : title, image : imageURL, departure : departure, arrival : arrival, tripId : tripId})

    //    res.render('viewlists', {groceryList : data})


// get the guid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
  
  
  app.listen(3000, () => console.log('Example app listening on port 3000!'))