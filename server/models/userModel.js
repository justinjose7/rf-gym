const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  pwdHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { collection: 'Users' });

module.exports = mongoose.model('user', userSchema);
