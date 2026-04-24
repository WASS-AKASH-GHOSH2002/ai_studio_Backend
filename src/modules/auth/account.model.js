// account.model.js
const mongoose = require('mongoose');
const basePlugin = require('../../base/base.plugin');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  permissions: { type: [String], default: [] },
  isVerified: { type: Boolean, default: false },
  user: { type: String, ref: 'User' },
});

accountSchema.plugin(basePlugin);

module.exports = mongoose.model('Account', accountSchema);
