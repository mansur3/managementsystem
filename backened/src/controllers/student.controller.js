const express = require("express");
const router = express.Router();

const Student = require("../models/student.model.js");


router.post("/", async (req, res) => {
    const s = await Student.create(req.body);

    const student = await Student.find().lean().exec();
    return res.status(201).send({student})
})


router.get("/sortByname", async (req, res) => {
    const student = await Student.find().sort({name : 1}).lean().exec();

    return res.status(200).send({student})
})

router.get("/sortByAge", async(req, res) => {
    const student = await Student.find().sort({age : 1}).lean().exec();

    return res.status(200).send({student});
})



router.get("/", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    const student = await Student.find().skip(offset).limit(size).lean().exec();
    const totalStudent = await Student.find().countDocuments().lean().exec();
    let totalpage = Math.ceil(totalStudent/ size);

    return res.status(200).send({student, totalpage});
})
router.delete("/:id", async (req, res) => {
    const d = await Student.findByIdAndDelete(req.params.id).lean().exec();
    const student = await Student.find().lean().exec();
    return res.status(200).send({student});
})

module.exports = router;