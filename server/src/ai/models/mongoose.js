const mongoose = require('../../../services/mongoose');

const Link = mongoose.model(
    'Link',
    {
        url: {
            type: String,
            required: true,
            unique: true,
        },
        is_harmful: Boolean,
        hate_words: [String],
        last_updated: Date,
        is_reported: {
            type: Boolean,
            default: false
        },
        times_reported: Number
    },
    'links'
);

module.exports = {
    Link,
};