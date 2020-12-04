const express = require("express");
const User = require("../models/User");
const router = new express.Router();

router.post("/register", async (req,res) => {
    User.create(req.body)
        .then(user=>res.status(200).send(user))
        .catch(e=>res.status(500).send({error: e}))
});

router.post("/login", async (req,res) => {
    User.findOne(req.body)
        .then(user=>res.status(200).send(user))
        .catch(e=>res.status(500).send({error: e}))
});

module.exports = router