const mongoose= require('mongoose');

const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true

    },
    username:{
        type:String,
        required:true,
        trim:true

    },
    
    registered:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('User', UsersSchema);

