const { Call, validate } = require("../models/call");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async(req, res) => {
    const calls = await Call.find()
        .populate('id')
        .select("-__v")
        .sort("name");
    res.send(calls);
});

router.post("/", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const call = new Call({
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        startDate: req.body.startDate,
        completionDate: req.body.completionDate
    });
    call = await call.save();

    res.send(call);
});

router.put("/:id", auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const call = await Call.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            startDate: req.body.startDate,
            completionDate: req.body.completionDate,
            updatedOn: Date.now
        }, { new: true }
    );

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    res.send(call);
});

router.delete("/:id", auth, async(req, res) => {
    const call = await Call.findByIdAndRemove(req.params.id);

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    res.send(call);
});

router.get("/:id", auth, async(req, res) => {
    const call = await Call.findById(req.params.id).select("-__v");

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    res.send(call);
});

module.exports = router;