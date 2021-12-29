const express = require("express");
const router = express.Router();


const Contest = require("../models/contest.model") 

router.post("/", async (req, res) => {
    const contest = await Contest.create(req.body);
    return res.status(201).send({contest})
})

router.get("/", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    const contest = await Contest.find().skip(offset).limit(size).lean().exec();
    const totalContest = await Contest.find().countDocuments().lean().exec();
    let totalPage = Math.ceil(totalContest/size);
    return res.status(200).send({contest,totalPage});
})

module.exports = router;