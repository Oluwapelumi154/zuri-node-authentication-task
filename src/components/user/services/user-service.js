const {
  serviceResponse,
  hashPassword,
  signJWT,
  generateToken
} = require('../../../utils');
const { sendEmail } = require('../../../utils');
const { hashToken } = require('../../../utils/token');
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
      const { token: verificationToken, hashedToken } = generateToken();
      const URL = `http://127.0.0.1:8000/api/user/verify-email?token=${verificationToken}`;

      const user = {
        ...body,
        verificationToken: hashedToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000
      };

      // await sendEmail({
      //   to: user.email,
      //   subject:
      //     'verify your Email your verification token is only valid for 1hr',
      //   text: `Hello user ${URL}`
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

  static async verifyUser(query) {
    try {
      const token = hashToken(query.token);
      const user = await userRepository.findByVerificationToken(token);
      if (!user) {
        return serviceResponse(
          'fail',
          400,
          'Invalid or Expired verification Link'
        );
      }
      user.verified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      user.save();
      return serviceResponse('success', 200, 'Sucessfully verified account');
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
      return serviceResponse('success', 200, 'Successfully Deleted User', user);
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
