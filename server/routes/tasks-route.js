const express = require('express');
const router = express.Router();

const Task = require('../model/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.send(task);
});

router.get('/team/:teamId', async (req, res) => {
  const { teamId } = req.params;
  Task.find({"team": teamId})
    .populate('team')
    .exec()
    .then((tasks) => {
      res.send({
        tasks,
      });
    });
});

router.get('/user/:name', async (req, res) => {
  const { name } = req.params;
  Task.find({"responsable": name})
    .then((tasks) => {
      res.send({
        tasks,
      });
    });
});

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send({
    status: 'Task saved'
  });
});

router.put('/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send({
    status: 'Task Updated'
  });
});

router.delete('/:taskId', async (req, res) => {
  await Task.findByIdAndRemove(req.params.taskId);
  res.send({
    status: 'Task deleted'
  });
});

module.exports = router;
