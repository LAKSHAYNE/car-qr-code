require('dotenv').config()
const express=require('express')
const app=express()
var plivo = require('plivo');
const url = require('url');
var PhloClient = plivo.PhloClient;
const authId=process.env.AUTHID;
const authToken=process.env.AUTHTOKEN;
var phloClient = phlo = null;
let dailnum;
let currentURL;
app.get('/',function(req,res){
    const current_url = new URL(req.protocol + "://"+req.get('host') + req.originalUrl);
    const search_params = current_url.searchParams;//parsing to create a search params object
    dailnum=search_params.get('num');
    console.log(dailnum);
    res.sendFile(__dirname+'/index.html')
})
app.post('/sms',function(req,res){
    const phloId='c634bcd4-9eff-4e10-95b0-f48642e24350';
    var payload = {
        from: process.env.PHLO_NUM,
        to: dailnum,
        item: 'Your vehicle requires yor attention.Please look for it.'
    }
    phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).run(payload).then(function (result) {
        console.log('Phlo run result', result);
    }).catch(function (err) {
        console.error('Phlo run failed', err);
    });
    console.log("button got clicked"+dailnum);
    res.redirect('/')
      });

app.post('/call',function(req,res){
    console.log('call button pressed'+dailnum);
    const phloId='d4304fc5-5338-4c4e-b755-7f9a70624900';
    var payload = {
        from: process.env.PHLO_NUM,
        to: dailnum
    }
    phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).run(payload).then(function (result) {
        console.log('Phlo run result', result);
    }).catch(function (err) {
        console.error('Phlo run failed', err);
    });
    res.redirect('/');
})

app.post('/check',function(req,res){
    console.log(typeof(dailnum));
    res.redirect('/');
})

app.listen(3000,()=>console.log('server running on port 3000'))
