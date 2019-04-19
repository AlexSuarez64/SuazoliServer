const { Call } = require("../models/call");
const auth = require("../middleware/auth");
const express = require("express");
const winston = require("winston");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const calls = await Call.find()
        .populate('id')
        .select("-__v")
        .sort("name");
    res.send(calls);
});

router.post("/", auth, async (req, res) => {
    let call = new Call({
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        startDate: req.body.startDate
    });

    call.validate(function (error) {
        if (error) {
            if (error) winston.error(`Validation: ${error.details[0].message}`);
            if (error) return res.status(400).send(`Validation: ${error.details[0].message}`);
        }
    });
    // winston.info(`Validation done.`);

    await call.save();
    // winston.info(`Save done.`);
    return res.send(call);
});

router.put("/:id", auth, async (req, res) => {
    let call = new Call(req.body);
    call.validate(function (error) {
        if (error) {
            if (error) winston.error(`Validation: ${error.details[0].message}`);
            if (error) return res.status(400).send(`Validation: ${error.details[0].message}`);
        }
    });
    // winston.info(`Validation done.`);
    req.body.updatedOn = Date.now();

    call = await Call.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            description: req.body.description,
            priority: req.body.priority,
            startDate: req.body.startDate,
            completionDate: req.body.completionDate,
            updatedOn: req.body.updatedOn
        }, { new: true }
    );

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    // winston.info(`Update done.`);
    res.send(call);
});

router.delete("/:id", auth, async (req, res) => {
    const call = await Call.findByIdAndDelete(req.params.id);

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    res.send(call);
});

router.get("/:id", auth, async (req, res) => {
    const call = await Call.findById(req.params.id).select("-__v");

    if (!call)
        return res
            .status(404)
            .send("The Call with the given ID was not found.");

    res.send(call);
});

module.exports = router;