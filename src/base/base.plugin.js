// base.plugin.js
const { v4: uuidv4 } = require('uuid');

const basePlugin = (schema) => {
  schema.add({
    _id: { type: String, default: uuidv4 },
    deletedAt: { type: Date, default: null },
  });

  schema.set('timestamps', true);
};

module.exports = basePlugin;
