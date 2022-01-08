const express = require("express");
const router = express.Router();
const Task = require("../modules/Task");

router
  .route("/")
  .get((req, res, next) => {
    Task.find()
      .then((tasks) => {
        res.json(tasks);
      })
      .catch(next);
  })

  .post((req, res, next) => {
    Task.create(req.body)
      .then((task) => {
        res.status(201).json(task);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Task.deleteMany()
      .then((reply) => {
        res.json(reply);
      })
      .catch(next);
  });

router
  .route("/:taskid")
  .get((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        res.json(task);
      })
      .catch(next);
  })

  .put((req, res, next) => {
    Task.findByIdAndUpdate(req.params.taskid, { $set: req.body }, { new: true })
      .then((task) => {
        res.json(task);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Task.deleteOne({ _id: req.params.taskid })
      .then((reply) => {
        res.json(reply);
      })
      .catch(next);
  });

router
  .route("/:taskid/notes")
  .get((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        res.json(task.notes);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        task.notes.push(req.body);
        task
          .save()
          .then((updatedTask) => {
            res.json(updatedTask.notes);
          })
          .catch(next);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        task.notes = [];
        task
          .save()
          .then((updatedTask) => {
            res.json(updatedTask.notes);
          })
          .catch(next);
      })
      .catch(next);
  });

router
  .route("/:taskid/notes/:noteid")
  .get((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        res.json(task.notes.id(req.params.noteid));
      })
      .catch(next);
  })

  .put((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        let note = task.notes.id(req.params.noteid);
        note.text = req.body.text;
        task
          .save()
          .then((updatedTask) => {
            res.json(task.notes.id(req.params.noteid));
          })
          .catch(next);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Task.findById(req.params.taskid)
      .then((task) => {
        task.notes = task.notes.filter((note) => {
          return note.id !== req.params.noteid;
        });
        task
          .save()
          .then((updatedTask) => {
            res.json(task.notes);
          })
          .catch(next);
      })
      .catch(next);
  });

module.exports = router;
