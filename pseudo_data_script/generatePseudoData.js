// NOTE: Commented out db url below so you don't overwrite the database

const { MongoClient } = require('mongodb');
const utils = require('utility');

// helper functions
function md5Hash(pwd) {
  const salt = '!39@$KD!@#IUHJh~~';
  return utils.md5(utils.md5(pwd + salt));
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

// const url = 'mongodb://justin:rfgym0@ds031607.mlab.com:31607/rf-gym'

const userArr = ['jon',
  'adam',
  'barry',
  'dallas',
  'chad',
  'washington',
  'justin',
  'martha',
  'stewart',
  'jerry',
  'jordan',
  'abigail',
  'kanye',
  'kenneth',
  'kenny',
  'tommy',
  'hidalgo',
  'jebin',
  'shawn',
  'mathews',
  'james',
  'joseph',
  'jeremiah',
  'waldo',
  'esteban',
];

const equipmentId = ['E0192',
  'F8203',
  'AC190',
  'QC500',
  'EZ1PZ',
  'DB09M',
  'WS1HH',
  '2019E',
  '123FC',
  '234F8',
  '235F8',
  'FZ1PZ',
  'GB09M',
  'HS1HH',
  'I019E',
];

const equipmentNames = ['Bench Press',
  'Squat Rack',
  'Squat Rack',
  'Lat Pulldown',
  'Fly Machine',
  'Treadmill',
  'Seated Row',
  'High Row',
  'Bench Press',
  'Treadmill',
  'Incline Bench Press',
  'Incline Bench Press',
  'Fly Machine',
  'Decline Bench Press',
  'Rope Machine',
];

// inserting equipment into database
MongoClient.connect(url, (err, database) => {
  if (err) { return console.log(err); }
  db = database.db('rf-gym');
  collection = db.collection('Equipment');
  for (let i = 0; i < equipmentId.length; i++) {
    const equipment = {};
    equipment.equipmentId = equipmentId[i];
    equipment.equipmentName = equipmentNames[i];
    equipment.inUse = false;
    equipment.isRepairNeeded = false;
    equipment.__v = 0;
    console.log(equipment);
    collection.insertOne(equipment);
  }
});

// inserting fake users into database
MongoClient.connect(url, (err, database) => {
  if (err) { return console.log(err); }
  // default password for all fake accounts is '1234'
  const usrPassword = '1234';
  db = database.db('rf-gym');
  collection = db.collection('Users');
  for (let i = 0; i < userArr.length; i++) {
    const user = {};
    user.userId = userArr[i];
    user.email = `${userArr[i]}@gmail.com`;
    user.name = capitalize(userArr[i]);
    user.pwdHash = md5Hash(usrPassword);
    user.isAdmin = false;
    user.active = true;
    user.__v = 0;
    console.log(user);
    collection.insertOne(user);
  }
});

// inserting fake equipment history into database
MongoClient.connect(url, (err, database) => {
  if (err) { return console.log(err); }
  let randomEqIndex = 0;
  let randomNameIndex = 0;
  let numMinsToAdd = 0;
  const today = new Date();
  const date = new Date();
  date.setDate(date.getDate() - 30);
  db = database.db('rf-gym');
  collection = db.collection('EquipmentHistory');
  // from 1 month ago until now, insert fake history data
  for (date; date.getTime() < today.getTime(); date.setMinutes(date.getMinutes() + 1)) {
    const equipmentUse = {};
    equipmentUse.inTime = new Date(date);
    // set equipment usage to random number of minutes between 1 and 15
    numMinsToAdd = Math.floor(Math.random() * 15) + 1;
    date.setMinutes(date.getMinutes() + numMinsToAdd);
    equipmentUse.outTime = date;
    // set random user
    randomNameIndex = Math.floor(Math.random() * userArr.length);
    // set random equipment
    equipmentUse.userId = userArr[randomNameIndex];
    randomEqIndex = Math.floor(Math.random() * equipmentNames.length);
    equipmentUse.equipmentName = equipmentNames[randomEqIndex];
    equipmentUse.equipmentId = equipmentId[randomEqIndex];
    equipmentUse.__v = 0;
    console.log(equipmentUse);
    collection.insertOne(equipmentUse);
  }
});
