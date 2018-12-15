const mongoose = require('mongoose');

const { Schema } = mongoose;

const equipmentSchema = new Schema({
  equipmentId: { type: String, required: true },
  equipmentName: { type: String, required: true },
  inUse: { type: Boolean, default: false },
  isRepairNeeded: { type: Boolean, default: false },
}, { collection: 'Equipment' });

module.exports = mongoose.model('equipment', equipmentSchema);
