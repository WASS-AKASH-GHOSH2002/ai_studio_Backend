// account.repository.js
const BaseModel = require('../../base/base.model');

class AccountRepository extends BaseModel {
  constructor(model) {
    super(model);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email, deletedAt: null });
  }
}

module.exports = AccountRepository;
