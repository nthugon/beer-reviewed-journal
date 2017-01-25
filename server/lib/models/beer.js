const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    brewer: {
        type: String,
        required: true
    },
    abv: {
        type: Number
    }
});

module.exports = mongoose.model('Beer', schema);
