class BaseRepository {
    constructor(model) {
      this.model = model;
    }

    async get(id) {
      return await this.model.findByPk(id);
    }

    async getAll() {
      return await this.model.findAll();
    }

    async create(entity) {
      return await this.model.create(entity);
    }

    async update(id, entity) {
      const ExistingEntity  = await this.get(id)
      return await ExistingEntity.update(entity);
    }


    async delete(id) {
      const ExistingEntity  = await this.get(id)
      await ExistingEntity.destroy(id);
      return true;
    }
    async count(){
      return await this.model.count();
    }
  }

  module.exports = BaseRepository;
