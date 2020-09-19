const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieImage: {
        type: String
    },
    movieRuntime: {
        type: String
    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = { Favourite }