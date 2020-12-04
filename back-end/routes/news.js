const express = require("express");
const News = require("../models/News");
const Saved = require("../models/Saved");
const router = new express.Router();

router.post("/add", async (req,res) => {
    News.create(req.body)
        .then(news=>res.status(200).send(news))
        .catch(e=>res.status(500).send({error: e}))
});

router.post("/delete", async (req,res) => {
    let arr = []
    arr.push(News.deleteOne(req.body))
    arr.push(Saved.deleteMany({newsId: req.body}))
    Promise.all(arr)
           .then(all=>res.status(200).send(all))
           .catch(e=>res.status(500).send({error: e}))
});

router.post("/update", async (req,res) => {
    News.updateOne({_id: req.body._id}, req.body)
        .then(news=>res.status(200).send(news))
        .catch(e=>res.status(500).send({error: e}))
});

router.get("/", async (req,res) => {
    News.find().sort({title: -1})
        .then(news=>res.status(200).send(news))
        .catch(e=>res.status(500).send({error: e}))
});

router.get("/get/:id", async (req,res) => {
    console.log(req.params.id)
    News.findOne({_id: req.params.id})
        .then(news=>res.status(200).send(news))
        .catch(e=>res.status(500).send({error: e}))
});

module.exports = router