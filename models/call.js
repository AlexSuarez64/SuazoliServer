const Joi = require("joi");
const mongoose = require("mongoose");

const Priorities = ['High', 'Medium', 'Low'];
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
        enum: Priorities,
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
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
}, { strict: false } );

// callSchema.pre('save', function (next) {
//     this.id = this.get('_id'); // considering _id is input by client
//     next();
// });

// callSchema.virtual('id').get(function() {
//     return this._id;
// });

callSchema.virtual('id',{
    localField: 'id',
    foreignField: '_id',
    justOne: true
});

callSchema.set('toObject', { virtuals: true });
callSchema.set('toJSON', { virtuals: true });
    
const Call = mongoose.model('Call', callSchema);

exports.Call = Call;
