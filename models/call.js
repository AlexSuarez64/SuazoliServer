const Joi = require("joi");
const mongoose = require("mongoose");

const enumPriorities = ['High', 'Medium', 'Low'];
const positiveNum = function(value) {
    if (value < 0) {
        return false;
    } else {
        return true;
    }
}

const callSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        enum: enumPriorities,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    completionDate: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

callSchema.virtual('hasName').get(function() {
    return this.name.length > 0;
});

const Call = mongoose.model("Call", callSchema);

function validate(call) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        description: Joi.string()
            .min(5)
            .max(1024)
            .required(),
        priority: Joi.string()
            .required(),
        startDate: Joi.Date()
            .required(),
    };

    return Joi.validate(call, schema);
}

exports.Call = Call;
exports.validate = validate;