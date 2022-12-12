//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailid;

    var data = {
        members: [
            {
               email_address: email,
               status: "subscribed",
               merge_fields: {
                FNAME: firstName,
                LNAME: lastName
               }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/7d717e4624"
    const options = {
        method: "POST",
        auth: "gagarin:6b5c14b45d7f280691121539db481dae-us14"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
         response.on("data", function(data){
            console.log(JSON.parse(data));
         });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req1, res1){
    res1.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000!");
});


//6b5c14b45d7f280691121539db481dae-us14 api key
//7d717e4624 audience id