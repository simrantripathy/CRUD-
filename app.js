const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Task = require('./models/Tasks');
const { findByIdAndDelete } = require('./models/Tasks');

const app = express();

const dbURI = 'mongodb+srv://simrantripathy:abcd1234@miniproject.xqhnb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  //register view engine
  app.set('view engine', 'ejs');

  //middleware
  app.use(express.static('public'));
  app.use(morgan('dev'));

  //database interaction- Create
  
  /* --Repeated code only to show that 4 documents were added to the "Tasks" collection.--

  app.get('/add-Task', (req, res) => {
    const Tasks = new Task({
      description: 'aaaa',
      completed: true
    });

app.get('/add-Task', (req, res) => {
    const Tasks = new Task({
      description: 'bbbb',
      completed: true
    });

app.get('/add-Task', (req, res) => {
    const Tasks = new Task({
      description: 'cccc',
      completed: false
    });
    */
  
  app.get('/add-Task', (req, res) => {
    const Tasks = new Task({
      description: 'dddd',
      completed: true
    });

    Tasks.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
  });

  //Read all documents which are not completed i.e. cccc
  app.get('/not-completed', (req, res) => {
    Task.findById('624b0e7246ced226382c640c')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
  });

  //Update not completed documents to completed
  app.get('/update-true', (req, res) => {
    Task.findByIdAndUpdate('624b0e7246ced226382c640c', {completed: true}, {upsert: true})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
  });

  //Delete a document by Id
  app.get('/delete', (req, res) => {
    Task.findByIdAndDelete('624b0e7246ced226382c640c')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
  });