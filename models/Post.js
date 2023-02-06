var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// porque en post debemos incluir el id del autor. 
var User = require('./User');

var PostSchema = new Schema({
    user: {
        // del modelo de user cogemos el id
    type: Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    publicationdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);