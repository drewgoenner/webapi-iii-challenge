const express = require('express');
const postDb = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({error: "Couldn't retrieve posts from the server"})
        })

});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;

    postDb.getById(id)
        .then( post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({error: "Post could not be retrieved from server"})
        })

});

router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id;

    postDb.remove(id)
        .then(removed => {
            res.send({message: `Post ID:${id} has been deleted`})
        })
        .catch(err => {
            res.status(500).json({error: "Could not remove post from the server"})
        })


});

router.put('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    const update = req.body;

    postDb.update(id, update)
        .then(post => {
            res.status(201).json(update)
        })
        .catch(err => {
            res.status(500).json({error: "Post could not be updated"})
        })


});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;

    postDb.getById(id)
        .then(post => {
            if (post) {
                res.post = post;
                next();
            } else {
                res.status(400).json({message: "invalid post id"})
            }
        })

};

module.exports = router;