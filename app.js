var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var app = express();
var mongoose = require("mongoose");
var xyz = bodyParser.urlencoded();
app.use(helmet());

app.use(bodyParser.json());

app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(morgan('combined'));
app.listen(PORT, () => {
    console.log('welcome ');
});
const mongoAtlasUri = "mongodb+srv://gaurav:5SdwM7w180U2CtZ9@cluster0.hqfkood.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
var con = mongoose.connection;
var schema = mongoose.Schema({enroll:{
    type: String,
    unique: true,
    required: true
  },name:String,dept:String
});
var m1 = mongoose.model("model1",schema,"student");

app.get("/", (req, res) => {
    var mysort = { enroll: 1 };
    data2=[{enroll:101}];
    m1.find(function(err,data){
    data2 = data;
    res.send(data2);
    }).sort(mysort);
});
app.get("/add",(req,res)=>{
    var row = new m1(req.query);
    row.save(function(err,result){
        if(result)
        res.send(true);
        else
        res.send(false);
    });
});
app.get("/delete",(req,res)=>{
    m1.deleteMany(req.query,function(err,result){
        if(result)
        res.send(true);
        else
        res.send(false);
    });
});
app.get("/edit",(req,res)=>{
    m1.updateMany({enroll : req.query.enroll},
        {$set:{name:req.query.name,dept:req.query.dept}},
        function(err,result){
            if(result)
            res.send(true);
            else
            res.send(false);
        });
});

