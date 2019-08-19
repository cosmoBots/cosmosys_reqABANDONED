'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

// view engine setup
let pathViews = [] 

pathViews.push(path.join(__dirname))

app.set('views', pathViews)
app.set('view engine', 'pug')

app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: false }))

app.use(express.static('public'))

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Cosmobots - ReqTree - Dev'
  })
})

app.use('/', router)

module.exports = app