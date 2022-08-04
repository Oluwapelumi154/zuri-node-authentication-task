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
      const newAdmin = await adminRepository.create(admin);
      const token = signJWT(newAdmin.id, newAdmin.email);

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
