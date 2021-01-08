const mongoose = require('mongoose')
const schema = mongoose.Schema;
const dotenv = require('dotenv')
dotenv.config();



mongoose.connect(process.env.MONGOURI,{ useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
                if(err){
                    console.log("error in connnecting databse"+err);
                }else{
                    console.log("mongoDB connected")
                }
})

var moviedb = new schema({
    title : String,
    release_date :Date,
    overview : String
},{collection:'moviedb'});


var moviemodel = mongoose.model('moviedb',moviedb);



module.exports = moviemodel;

