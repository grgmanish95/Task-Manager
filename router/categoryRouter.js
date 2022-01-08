const express = require('express');
const category = require('../modules/Category');
const routers = express.Router();
const Task = require('../modules/Task');


routers.route('/')
.get((req , res, next ) => {
    category.find()
    .then ((categories) => {
        res.json(categories);
    }).catch(next);
})

.post((req, res, next) => {
    category.create(req.body)
    .then((categories) => {
        res.status(201).json(categories);
    }).catch(next);
})

.delete((req, res, next) => {
    category.deleteMany()
    .then((reply) => {
        res.json(reply);
    }).catch(next);
})

routers.route('/:categoryID')
.get((req, res, next) =>{
    category.findById(req.params.categoryID)
    .then((category) => {
        res.json(category);
    }).catch(next);
})

.put((req, res, next) => {
    category.findByIdAndUpdate(req.params.categoryID, {$set : req.body}, {new : true })
    .then((updatedCategory) => {
        res.json(updatedCategory);
    }).catch(next);
})

.delete((req, res, next ) => {
    category.deleteOne({_id : req.params.categoryID})
    .then((reply) => {
        res.json(reply);
    }).catch(next);
})
routers.route('/:categoryID/tasks')
.get((req, res, next) => {
category.findById(req.params.categoryID)
.then(categories => {
    res.json(categories.tasks);
}).catch(next);
})
.post((req, res, next) => {
category.findById(req.params.categoryID)
.then(category => {
    Task.create(req.body)
    .then(task => {
        category.tasks.push(task.id)
        category.save()
        .then(updatedCategory => {
            res.status(201).json(updatedCategory.tasks);
        }).catch(next);
    }).catch(next);
}).catch(next);
})
.delete((req, res, next) => {
    category.findById(req.params.categoryID)
    .then((category) => {
        Task.deleteMany({_id : {$in: category.tasks}})
        .then(reply => {
            category.tasks = [];
            category.save()
            .then(updatedCategory => {
                res.json({reply , updatedCategory})
            }).catch(next);
        }).catch(next);
    })
})

routers.route('/:categoryID/tasks/:taskID')
.get((req, res, next) => {
    category.findById(req.params.categoryID)
    .then(category => {
        if(category.tasks.includes(req.params.taskID)){
            Task.findById(req.params.taskID)
            .then(task => {
                res.json(task);

            }).catch(next);
        } else{
            let err = new Error('File not found');
           
            next(err);
            

        }
    }).catch(next);
})
.put((req, res, next) => {
    category.findById(req.params.categoryID)
    .then(category => {
        if (category.tasks.includes(req.params.taskID)){
            Task.findByIdAndUpdate(req.params.taskID, {$set : req.body}, {new: true})
            .then(task => {
                res.json(task);
            }).catch(next);
    } else {
         throw new Error('Not found');
    }
}).catch(next);
    })

.delete((req, res, next) => {
category.findById(req.params.categoryID)
.then(Category => {
    if (Category.tasks.includes(req.params.taskID)){
        Task.deleteOne({_id : req.params.taskID})
        .then(reply => {
            Category.tasks = Category.tasks.filter((value) => {
                return value !== req.params.taskID;
            })
            Category.save()
            .then(updatedCategory => {
                res.json({reply, updatedCategory})
                
            }).catch(next);
        }).catch(next);
    } else {
        throw new Error('Not found');
    }
}).catch(next);
})
module.exports = routers;