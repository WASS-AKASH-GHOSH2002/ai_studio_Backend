// user.service.js
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    return await this.userRepository.create(data);
  }

  async getUsers() {
    return await this.userRepository.findAll();
  }
}

module.exports = UserService;
