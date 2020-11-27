const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
let Student_schema = new Schema ({
    roll:{type:Number,require:true}, 
    name:{type:String,require:true}, 
}, 
{
    collection:'stu'
}); 

module.exports = mongoose.model('Student',Student_schema); 