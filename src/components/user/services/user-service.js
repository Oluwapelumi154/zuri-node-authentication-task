const { userRepository } = require('../repositories');
class userService {
  static async create(body) {
    try {
      const userExist = await userRepository.findByEmail(body.name);
    } catch (err) {}
  }
}
module.exports = userService;
