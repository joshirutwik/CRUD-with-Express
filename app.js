const express = require("express"); 
const app = express(); 
const bodyparser = require("body-parser");
var urlencodedParser=bodyparser.urlencoded({ extended: false }) ; 

 require("./db"); 

var cors = require("cors");
var multer = require("multer"); 
var upload = multer({ dest: './uploads' });
const stu_sc = require("./model/stu_model.js"); 
var del = require('./delete');

app.set('view engine', 'ejs');
app.set('views','./views');



app.use(cors());   
app.post('/add', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
    response = {  
        Roll:req.body.roll,  
        Name:req.body.name  
    };  
    console.log(response);  
     
    stu_sc.create(req.body,(err,data) => {
      if(err)
      {
          console.log(err.message);
          return(err.message); 
      }
      
  });
  res.redirect('../display');
    
 });
 
app.listen(8000,() => {
    console.log("Server started at 8000"); 
}); 
app.get("/",(req,res) => {
    res.render('index');
}); 

app.get("/display",function(req,res){
    stu_sc.find({},function(err,users){
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.render('display',{users:users}); 
            console.log(users);
        }
    })
});

app.get('/delete/:id',function(req,res){
    stu_sc.findByIdAndRemove(req.params.id,function(err,project){
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.redirect('../display');
        }
    });
});

app.get('/edit/:id',function(req,res){
    stu_sc.findById(req.params.id,function(err,users){
        if(err)
        {
            console.log(err.stringify());
        }
        else 
        {            
            res.render('./edit-form',{stu_detail:users});            
        }
    })
});

app.post('/edit/:id',urlencodedParser,function(req,res){
    var data ={
        roll:req.body.New_Roll, 
        name:req.body.New_Name,
    };
    
    stu_sc.findByIdAndUpdate(req.params.id,{$set:data},{new:true},function(err,docs){
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log("The Request body: "+data);
            console.log("ID: "+req.params.id+"  Updated Doc   "+docs);
            res.redirect('../display');            
        }
    });
});