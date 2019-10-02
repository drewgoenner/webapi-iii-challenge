const express = require('express');
const postDb = require('../posts/postDb.js');
const userDb = require('./userDb.js');


const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;

    userDb.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "Could not add user to database"})
        });

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body.text;
    const id = req.params.id;

    postDb.insert({text: post, user_id: id})
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            res.status(500).json({ error: "Could not add post"})
        });

});

router.get('/', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({error: "Could not fetch list of users"})
        })

});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    userDb.getById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({error: "Could not fetch user info from database"})
        })

});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;

    userDb.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({error: "Could not fetch posts from server"})
        })

});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then(removed => {
            res.send({message: `User ID:${id} has been deleted`})
        })
        .catch(err => {
            res.status(500).json({error: "User could not be deleted"})
        })

});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const update = req.body;

    userDb.update(id, update)
        .then(user => {
            res.status(201).json(update)
        })
        .catch(err => {
            res.status(500).json({error: "Could not update user information"})
        })

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

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

    if (!Object.keys(user).length) {
        res.status(400).json({ message: "missing user data" });
    } else if (!user.name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }

};

function validatePost(req, res, next) {
    const post = req.body;

    if (!Object.keys(post).length) {
        res.status(400).json({ message: "missing post data" });
    } else if (!post.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }

};

module.exports = router;
