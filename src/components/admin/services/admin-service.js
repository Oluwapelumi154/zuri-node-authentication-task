const { serviceResponse, hashPassword, signJWT } = require('../../../utils');
const { adminRepository } = require('../repositories');

class adminService {
  static async create(body) {
    try {
      const adminExist = await adminRepository.findByEmail(body.email);
      if (adminExist) {
        return serviceResponse(
          'status',
          400,
          'A user already  exist with this email'
        );
      }
      body.password = await hashPassword(body.password);
      const admin = {
        ...body
      };
      const token = signJWT(admin._id, admin.email);
      const newAdmin = await adminRepository.create(admin);
      return serviceResponse('success', 201, 'Succesfully Created a User', {
        token,
        user: newAdmin
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = adminService;
