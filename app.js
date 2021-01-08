const express  =  require('express')
const app = express();
const path = require('path')
const request = require('request');


const moviemodel = require('./modules/save');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/search',(req,res)=>{
    let query = req.query.search;
    console.log(query)

    request('https://api.themoviedb.org/3/search/movie?api_key=d4f4bbc8b9595d0a2dff68a77515c33f&query='+query,(err,response,body)=>{
        if(err){
            console.log(err)
        }else{
         let data= JSON.parse(body);
         res.render('movies',{data:data,query:query});


        }
    })
})

app.post('/save',(req,res)=>{
    console.log('enterd save')
    var movie = moviemodel({
        title: req.body.title,
        release_date: req.body.date,
        overview: req.body.overview
    })

    movie.save().then(movie=>{
        console.log("saved")
        res.redirect('/');
    }).catch((err)=>{
        console.log("err"+err)
    })
})

app.get('/list',(req,res)=>{
    console.log("enteres ist")
    moviemodel.find({}).then(movie=>{
        let data = movie;
    
        res.render('list',{data:data});
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/delete',(req,res)=>{
    moviemodel.findByIdAndDelete({_id:req.body.id}).then(()=>{
        console.log("deldeted")
        res.redirect('list')
    }).catch(err=>{
        console.log(err)
    })
})



app.listen(3000,()=>{
    console.log("server running on port 3000");
})