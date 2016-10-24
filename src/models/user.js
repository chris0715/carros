var mongo = require('mongodb');
var userSchema = mongo.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    displayName: String,
    bio : String
    
})

userSchema.method.name = function(){
    return this.displayName || this .username
}