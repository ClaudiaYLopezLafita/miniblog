var UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        index: { unique: true }
    },
    password: { 
        type: String, 
        required: true 
    },
    fullname: String,
    email: { 
        type: String, 
        required: true 
    },
    creationdate: { 
        type: Date, 
        default: Date.now 
    },
    role: {
        type: String,
        enum: ['admin', 'subscriber'],
        default: 'subscriber '
    },
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post',
        default: null
    }]
});