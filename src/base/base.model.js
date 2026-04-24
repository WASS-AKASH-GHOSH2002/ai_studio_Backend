// base.model.js
class BaseModel {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.find({ deletedAt: null });
  }

  async findById(id) {
    return await this.model.findOne({ _id: id, deletedAt: null });
  }

  async findOne(query) {
    return await this.model.findOne({ ...query, deletedAt: null });
  }

  async updateById(id, data) {
    return await this.model.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true }
    );
  }

  async deleteById(id) {
    return await this.model.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
  }
}

module.exports = BaseModel;
