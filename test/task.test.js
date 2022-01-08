const request =require('supertest');
const express = require('express');
const mongoose= require('mongoose');
const taskRouter= require('../router/taskRouter');
const { deleteOne } = require('../modules/Task');

const app = express();
app.use('/tasks', taskRouter);

describe('Test task Router', () => {
beforeAll (() => {
    mongoose.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then((db) =>{
        console.log('Connected.....');
        done();
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    })
})

afterAll(() => {
    mongoose.disconnect().then(() => {
        console.log('Disconnecting....');
        done();
    });
})

  /*  test('get some tasks', () => {
        return
        
    })*/
    
})