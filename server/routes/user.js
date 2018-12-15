/* eslint-disable no-underscore-dangle */
const express = require('express');
const utils = require('utility');
const User = require('../models/userModel');

const Router = express.Router();

function md5Hash(pwd) {
  const salt = '!39@$KD!@#IUHJh~~';
  return utils.md5(utils.md5(pwd + salt));
}

Router.post('/login', (req, res) => {
  const { userId, pwd } = req.body;
  const pwdHash = md5Hash(pwd);
  User.findOne({ $or: [{ userId, pwdHash }, { email: userId, pwdHash }] }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: 'Check if username and password are correct' });
    }
    res.cookie('sessionId', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/register', (req, res) => {
  const {
    userId, name, email, pwd,
  } = req.body;
  User.findOne({ $or: [{ userId }, { email }] }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: 'Username or email already exists', doc });
    }
    const pwdHash = md5Hash(pwd);
    const userModel = new User({
      userId, name, email, pwdHash,
    });

    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: 'Server Error', e });
      }
      const { user, type, _id } = d;
      res.cookie('sessionId', _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});


Router.get('/info', (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: sessionId }, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: 'Server Error' });
    }
    return res.json({ code: 0, data: doc });
  });
});

module.exports = Router;
