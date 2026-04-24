// user.model.js
const mongoose = require('mongoose');
const basePlugin = require('../../base/base.plugin');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

userSchema.plugin(basePlugin);

module.exports = mongoose.model('User', userSchema);
