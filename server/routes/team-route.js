const express = require('express');
const router = express.Router();

const Team = require('../model/team');

router.get('/', async (req, res) => {
  const teams = await Team.find({});
  res.send(teams);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  res.send(team);
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.send({
    status: 'Team saved'
  });
});

router.put('/:id', async (req, res) => {
  await Team.findByIdAndUpdate(req.params.id, req.body);
  res.send({
    status: 'Team Updated'
  });
});

router.delete('/:teamId', async (req, res) => {
  await Team.findByIdAndRemove(req.params.teamId);
  res.send({
    status: 'Team deleted'
  });
});

module.exports = router;
