const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
    },
    body: {
        type: String,
        required:  true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }