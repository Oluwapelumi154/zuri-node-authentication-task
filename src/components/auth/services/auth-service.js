const { serviceResponse, comparePassword, signJWT } = require('../../../utils');
const { adminRepository } = require('../../admin/repositories');
const { staffRepository } = require('../../staff-manager/repositories');
const { userRepository } = require('../../user/repositories');

class authService {
  static async authenticateUser(body) {
    try {
      const user = await userRepository.findByEmail(body.email);
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const isValidPassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isValidPassword) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const token = signJWT(user._id, user.email);
      return serviceResponse(
        'success',
        200,
        'Successfully Authenticated User',
        { token, user }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async authenticateAdmin(body) {
    try {
      const user = await adminRepository.findByEmail(body.email);
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const isValidPassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isValidPassword) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const token = signJWT(user._id, user.email);
      return serviceResponse(
        'success',
        200,
        'Successfully Authenticated User',
        { token, user }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async authenticateStaff(body) {
    try {
      const user = await staffRepository.findByEmail(body.email);
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const isValidPassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isValidPassword) {
        return serviceResponse('fail', 401, 'Incorrect Email or Password');
      }
      const token = signJWT(user._id, user.email);
      return serviceResponse(
        'success',
        200,
        'Successfully Authenticated User',
        { token, user }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = authService;
