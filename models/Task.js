const mongoose= require('mongoose');

const TasksSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    registered:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Task', TasksSchema);

