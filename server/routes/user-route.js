const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get('/', async (req, res) => {
    await User.find({})
        .populate('team')
        .exec()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
});

router.get('/team/:teamId', async(req, res) => {
    const { teamId } = req.params;
    User.find({"team": teamId})
        .then((users) => {
            res.send({
                status: 'ok',
                users,
            });
        });
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send({
        status: 'User saved'
    });
});

router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
        status: 'User Updated'
    });
});

router.delete('/:taskId', async (req, res) => {
    await Task.findByIdAndRemove(req.params.taskId);
    res.send({
        status: 'Task deleted'
    });
});

module.exports = router;
