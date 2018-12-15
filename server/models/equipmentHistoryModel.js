const mongoose = require('mongoose');

const { Schema } = mongoose;

const equipmentHistorySchema = new Schema({
  equipmentId: { type: String, required: true },
  equipmentName: { type: String, required: true },
  userId: { type: String, required: true },
  inTime: { type: Date, required: true },
  outTime: { type: Date, default: null },
}, { collection: 'EquipmentHistory' });

module.exports = mongoose.model('equipmentHistory', equipmentHistorySchema);
