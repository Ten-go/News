const express = require("express");
const Saved = require("../models/Saved");
const News = require("../models/News");
const router = new express.Router();

router.post("/", async (req,res) => {
    Saved.create(req.body)
        .then(saved=>res.status(200).send(saved))
        .catch(e=>res.status(500).send({error: e}))
});

router.get("/:id", async (req,res) => {
	try {
		const saved = await Saved.find({userId: req.params.id})
		const _saved = saved.map(async e=>{
			const news = await News.findOne({_id: e.newsId})
			return({news, _id: e._id})
		})
		const news = await Promise.all(_saved)
		res.status(200).send(news)
	} catch(e) {
		res.status(500).send({error: e})
	}
});

router.post("/delete", async (req,res) => {
	try {
		console.log(req.body)
		const saved = await Saved.deleteOne(req.body)
		res.status(200).send(saved)
	} catch(e) {
		res.status(500).send({error: e})
	}
});

module.exports = router