const { serviceResponse, hashPassword, signJWT } = require('../../../utils');
const { userRepository } = require('../repositories');

class userService {
  static async create(body) {
    try {
      const userExist = await userRepository.findByEmail(body.email);
      if (userExist) {
        return serviceResponse(
          'fail',
          400,
          'A user already exist with this email'
        );
      }
      body.password = await hashPassword(body.password);
      const user = {
        ...body
      };
      const token = signJWT(user._id, user.email);
      const newUser = await userRepository.create(user);
      return serviceResponse('success', 201, 'Successfully Created User', {
        token,
        user: newUser
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = userService;
