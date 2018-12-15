const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cookieParser = require('cookie-parser');


const app = express();
const server = http.createServer(app);

server.listen(9000, () => {
  console.log('Listening on port 9000');
});

const io = require('socket.io')(server);
const equipmentHistoryModel = require('./models/equipmentHistoryModel');
const equipmentModel = require('./models/equipmentModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const userRouter = require('./routes/user');
const gymRouter = require('./routes/gym');

app.use('/user', userRouter);
app.use('/gym', gymRouter);


mongoose.connect('mongodb://justin:rfgym0@ds031607.mlab.com:31607/rf-gym');

const db = mongoose.connection;

db.on('error', () => { console.log('Mongoose/MongoDB Connection Failed'); });

db.once('open', () => {
  console.log('Mongoose/MongoDB Connection Success');
});


io.on('connection', (socket) => {
  console.log(`Connected socket id: ${socket.id}`);
  // Send initial list
  equipmentModel.aggregate(
    [
      {
        $project: {
          equipmentName: '$equipmentName',
          equipmentId: '$equipmentId',
          inUse: '$inUse',
        },
      },

      {
        $sort: { equipmentName: 1 },
      },
    ],
  ).exec((err, docs) => {
    if (err) {
      console.log('Error grabbing initial data');
    } else {
      socket.emit('initialList', docs);
      console.log('Success grabbing initial data');
    }

    socket.on('disconnect', () => {
      console.log(`Disconnected socket id: ${socket.id}`);
    });

    socket.on('error', (err) => {
      console.log(err);
    });
  });
});
// app.post('/queueUser', (req, res) => {
//   const { userId, equipmentId, equipmentName } = req.body;


//   const eqHistory = new equipmentHistoryModel({
//     userId,
//     equipmentId,
//     equipmentName,
//     inTime: new Date(),
//   });

//   eqHistory.save((err, result) => {
//     if (err) {
//       console.log('Error adding member');
//     } else {
//       eqHistory.find({}, (err, docs) => {
//         if (err) {
//           console.log('Error grabbing initial data');
//         } else {
//           io.emit('newMember', docs);
//           console.log('Success grabbing initial data');
//         }
//       });
//     }
//     return res.json({ userId });
//   });
// });
