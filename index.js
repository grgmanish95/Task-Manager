const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');


const categoryRouter = require('./router/categoryRouter');
const taskRouter = require('./router/taskRouter');
const userRouter = require('./router/userRouter');
const uploadRouter= require('./router/upload');
const uploadFile = require('./router/fileUpload');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/category', categoryRouter);
app.use('/tasks', taskRouter);
app.use('/user',userRouter);
app.use('/upload',uploadRouter);
app.use('/upload/files',uploadFile);
app.use(cors('*'));
//to serve the static file 
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,'public/fileuploads')));

mongoose.connect(process.env.DbURI, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
    useCreateIndex:true}) 
    .then (() => {
        console.log('Connected to database server');
    });

    app.get('/', (req, res) => {
   res.send("welcome to my app");
});



app.listen(process.env.Port, ()=> {
    console.log(`Server is running at localhost:${process.env.Port}`);
});
