const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const gymMemberModel = require('./models/gymMemberModel')
const app = express();
const server = http.createServer(app);

server.listen(9000, () => {
    console.log('Listening on port 9000');
});

const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://justin:gym@ds229690.mlab.com:29690/rf-gym')

var db = mongoose.connection

db.on('error', ()=> {console.log( 'Mongoose/MongoDB Connection Failed')})

db.once('open', () => {
    console.log( 'Mongoose/MongoDB Connection Success')
})

io.on('connection', (socket) => {
    console.log('Connected socket id: ' + socket.id);
    // Send initial list
    gymMemberModel.find({}, (err, docs) => {
        if (err){
            console.log("Error grabbing initial data");
        }
        else {
            socket.emit('initialList', docs);
            console.log("Success grabbing initial data");
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected socket id: ' + socket.id);
    });
    
    socket.on('error', (err) => {
        console.log(err);
    });
});

app.post('/queueUser', (req, res) => {
    let member_name = req.body.member_name;
    let member_id = req.body.member_id;
    let date_started = Date.now();
    
    var member = new gymMemberModel({
        member_name: member_name,
        member_id: member_id,
        date_started: date_started,
        date_finished: date_started
    });
    
    member.save((err, result) => {
        if (err) {
            console.log('Error adding member');
        }
        else {
            gymMemberModel.find({}, (err, docs) => {
                if (err){
                    console.log("Error grabbing initial data");
                }   
                else {
                    io.emit('newMember', docs);
                    console.log("Success grabbing initial data");
                }
            });
        }
    return res.json({member_name: member})
    });
});
