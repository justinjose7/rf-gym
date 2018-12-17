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


app.post('/queue_user', (req, res) => {
  const { userId, equipmentId, equipmentName } = req.body;


  const eqHistory = new equipmentHistoryModel({
    userId,
    equipmentId,
    equipmentName,
    inTime: new Date(),
  });

  equipmentHistoryModel.aggregate(
    [
      {
        $match: { equipmentId, outTime: null },
      },
    ],
  ).exec((err, doc) => {
    if (doc.length > 0) {
      return res.json({ code: 1, msg: 'Equipment busy' });
    }
    eqHistory.save((error) => {
      if (error) {
        return res.json({ code: 2, msg: 'Error while queuing' });
      }
      equipmentModel.findOneAndUpdate({ equipmentId }, { $set: { inUse: true } }, {}, (err2) => {
        if (err2) {
          return res.json({ code: 2, msg: 'Error while queuing' });
        }
        equipmentModel.find({}, ['equipmentName', 'equipmentId', 'inUse'], { sort: { equipmentName: 1 } }, (err3, docs) => {
          if (err3) {
            return res.json({ code: 2, msg: 'Error while grabbing new docs' });
          }
          console.log('emitted');
          io.sockets.emit('newList', docs);
          return res.json({ code: 0, msg: 'Success queuing', data: docs });
        });
      });
    });

    return res.json({ code: 0, msg: 'Success queuing' });
  });
});


app.post('/dequeue_user', (req, res) => {
  const { equipmentId } = req.body;


  equipmentHistoryModel.aggregate(
    [
      {
        $match: { equipmentId, outTime: null },
      },
    ],
  ).exec((err, doc) => {
    if (doc.length === 0) {
      return res.json({ code: 1, msg: 'Equipment already available' });
    }
    equipmentHistoryModel.findOneAndUpdate({ equipmentId, outTime: null }, { $set: { outTime: new Date() } }, {}, (error) => {
      if (error) {
        return res.json({ code: 2, msg: 'Error while dequeuing' });
      }
      equipmentModel.findOneAndUpdate({ equipmentId }, { $set: { inUse: false } }, {}, (err2) => {
        if (err2) {
          return res.json({ code: 2, msg: 'Error while dequeuing' });
        }
        equipmentModel.find({}, ['equipmentName', 'equipmentId', 'inUse'], { sort: { equipmentName: 1 } }, (err3, docs) => {
          if (err3) {
            return res.json({ code: 2, msg: 'Error while grabbing new docs' });
          }
          console.log('emitted');
          io.sockets.emit('newList', docs);
          return res.json({ code: 0, msg: 'Success dequeuing' });
        });
      });
    });

    return res.json({ code: 0, msg: 'Success dequeuing' });
  });
});
