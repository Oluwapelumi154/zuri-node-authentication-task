const { serviceResponse, hashPassword, signJWT } = require('../../../utils');
const { staffRepository } = require('../repositories');

class staffService {
  static async create(body) {
    try {
      const userExist = await staffRepository.findByEmail(body.email);
      if (userExist) {
        return serviceResponse(
          'status',
          400,
          'A user already  exist with this email'
        );
      }
      body.password = await hashPassword(body.password);
      const user = {
        ...body
      };
      const token = signJWT(user._id, user.email);
      const newUser = await staffRepository.create(user);
      return serviceResponse('success', 201, 'Succesfully Created a User', {
        token,
        user: newUser
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = staffService;
