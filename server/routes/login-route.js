const express = require('express');
const User = require('../model/user');

const router = express.Router();

router.post('/', async (req, res) => {  
    const { user, password } = req.body;
    await User.find()
        .then((users) => {
            users.forEach((usr) => {
                if(usr.user === user && usr.password === password) {
                    console.log('Ok validation')
                    res.send({
                        status: 'ok',
                        id: usr._id,
                        idTeam: usr.team,
                        name: usr.name,
                        role: usr.role,
                    });
                };
            });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
