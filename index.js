const express=require('express')
const app=express()
var plivo = require('plivo');
var PhloClient = plivo.PhloClient;
const authId='MAOWZKMGJKNZLLYJQ3YJ';
const authToken='ZmRhNTE4ZDdmMjE5NjI3YjdlZmVjYzdhZTdkMGQ2';
const phloId='c634bcd4-9eff-4e10-95b0-f48642e24350';
var phloClient = phlo = null;
let client = new plivo.Client('MAOWZKMGJKNZLLYJQ3YJ','ZmRhNTE4ZDdmMjE5NjI3YjdlZmVjYzdhZTdkMGQ2');
app.get('/',(req,res)=>res.sendFile(__dirname+'/index.html'))

app.post('/sms',function(req,res){
    var payload = {
        from: '+1 844-955-3598',
        to: '+918851423904',
        item: 'THE WEEKND IS YOUR RELIGION'
    }
    phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).run(payload).then(function (result) {
        console.log('Phlo run result', result);
    }).catch(function (err) {
        console.error('Phlo run failed', err);
    });
    console.log("button got clicked");
    res.redirect('/')
      });

app.listen(3000,()=>console.log('server running on port 3000'))