const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    id: {
        type: String
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: String
    }, 
    category: {
        type: String
    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = { Favourite }