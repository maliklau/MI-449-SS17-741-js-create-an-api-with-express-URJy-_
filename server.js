var express = require('express')
var todos = require('./todos.js')

var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my todo API!! :) '
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.post('/todos', function (request, response) {
  var id = request.body.task.trim().toLowerCase().split(' ').join('-')
  todos[id] = {
    task: request.body.task.trim(),
    done: request.body.done.trim()
  }
  response.redirect('/todos/' + id)
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('404 Error: there is no todo here!! :(  ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

app.delete('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('404 Error: there is no todo here!! :( ' + request.params.id)
    return
  }
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var mytodo = todos[request.params.id]
  if (!mytodo) {
    response.status(404).end('404 Error: there is no todo here!! :(  ' + request.params.id)
    return
  }
  if (request.body.task !== undefined) {
    mytodo.task = request.body.task.trim()
  }
  if (request.body.done !== undefined) {
    mytodo.done = request.body.done.trim()
  }
  response.redirect('/todos')
})

app.use(function (request, response, next) {
  response.status(404).end('404 Error: there is no todo here!! :( ' + request.url + ' not found')
})

app.listen(port)
