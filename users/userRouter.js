const express = 'express';
const postDb = require('postDb');
const userDb = require('userDb');


const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params;

    userDb.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: "invalid user id" })
            }
        })
};

function validateUser(req, res, next) {
    const user = req.body;

    if (user.length === 0) {
        res.status(400).json({ message: "missing user data" });
    } else if (!user.name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }

};

function validatePost(req, res, next) {
    const post = req.body;

    if (post.length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (!post.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }

};

module.exports = router;
