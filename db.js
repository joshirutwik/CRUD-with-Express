const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://127.0.0.1:27017/reactdb",{
    useNewUrlParser:true,
	useUnifiedTopology: true 
}).then(() => {
    console.log("Database Connected");
}, err => {
    console.log("Not Connected to database");
});