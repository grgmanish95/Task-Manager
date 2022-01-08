const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User= require('../modules/Users');
const jwt = require('jsonwebtoken');
const validation = require('../validator');

router.post('/signup', (req, res, next) =>{
   /* const {errors, isValid} = validation.registerValidator(req.body);
    if (!isValid) {
        res.status(400).json({
            status:"error",
            message : errors
        });
    }*/
let {firstName, lastName, username, password} = req.body;
User.findOne({username})
.then((user) =>{
    if (user){
        let err= new Error('User already exists');
        err.status=401;
       return next(err);
    }
   bcrypt.hash(password,10)
    .then(hashed => {
       
        User.create({username, password : hashed, firstName, lastName})
        .then((user)=>{
            let payload = {
                id : user.id,
                username : user.username,
                firstName : user.firstName,
                lastName : user.lastName
            }
            jwt.sign(payload,process.env.SECRET,  (err, token)=>{
                if (err){
                    return next(err);
                }
                res.json({
                    status:'Registration successful',
                    token : `Bearer ${token}`
                });
            });
        }).catch(next);
    } ).catch(next);


}).catch(next);
})

router.post('/login', (req,res,next) =>{
let {username, password} = req.body;
User.findOne({username})
.then((user) =>{
    if(!user){
        let err = new Error('User not found!');
        err.status = 401;
        return next(err);
    }
    bcrypt.compare(password, user.password  )
    .then((isMatched)=>{
        if(!isMatched){
            let err = new Error('Password doesnot match!');
            err.status = 401;
            return next(err);
        }
        let payload = {
            id : user.id,
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName
        }
        jwt.sign(payload,process.env.SECRET,  (err, token)=>{
            if (err){
                return next(err);
            }
            res.json({
                status:'login successful',
                token : `Bearer ${token}`
            });
        });
    }).catch(next);
}).catch(next);


})

module.exports = router;