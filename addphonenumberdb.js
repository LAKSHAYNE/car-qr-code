require('dotenv').config()
const express=require('express')
const app=express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@cluster0.siopf.mongodb.net/'+process.env.DBNAME+'?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true })
const phoneSchema={
    phone:String
}
const phonenos=mongoose.model('phoneno',phoneSchema)

app.get('/done',(req,res)=>{res.send('SUBMITTED')})

app.post('/add',(req,res)=>{
    const newphoneno=new phonenos({
        phone:req.body.phoneno
    })
    newphoneno.save()
    console.log(req.body.phoneno);
    res.redirect('/done')
})

app.get('/',(req,res)=>res.sendFile(__dirname+'/phoneadd.html'))
app.listen(3030,()=>console.log('server running on port 3030'))