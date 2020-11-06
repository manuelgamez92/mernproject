const mongoose= require('mongoose');

const ProjectsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    registered:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectsSchema);

