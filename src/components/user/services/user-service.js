const { serviceResponse, hashPassword, signJWT } = require('../../../utils');
const { sendEmail } = require('../../../utils');
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
      // await sendEmail({
      //   to: user.email,
      //   subject: 'verify your Email',
      //   text: 'Hello user'
      // });
      const newUser = await userRepository.create(user);
      const token = signJWT(newUser.id, newUser.email);

      return serviceResponse('success', 201, 'Successfully Created User', {
        token,
        user: newUser
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async deleteById(userId) {
    try {
      const user = await userRepository.deleteById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid userId');
      }
      return serviceResponse('success', 200, 'Successfully Deleted User');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findAll() {
    try {
      const user = await userRepository.find();
      return serviceResponse('success', 200, 'Successfully fetched all Users', {
        user
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = userService;
