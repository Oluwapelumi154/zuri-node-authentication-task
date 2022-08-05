const {
  serviceResponse,
  comparePassword,
  signJWT,
  generateToken,
  hashPassword,
  verifyJWT,
  compareTime
} = require('../../../utils');
const { hashToken } = require('../../../utils/token');
const { adminRepository } = require('../../admin/repositories');
const { staffRepository } = require('../../staff/repositories');
const { userRepository } = require('../../user/repositories');
const { sendEmail } = require('../../../utils');

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
      const token = signJWT(user.id, user.email);
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

  static async forgotUserPassword(body) {
    try {
      const user = await userRepository.findByEmail(body.email);
      if (!user) {
        return serviceResponse('fail', 400, 'Incorrect Email');
      }
      const { token, hashedToken } = generateToken();
      const updatedUser = await userRepository.update(body.email, {
        resetToken: hashedToken,
        resetTokenExpiresAt: Date.now() + 10 * 60 * 1000
      });

      const URL = `http://127.0.0.01:8000/api/user/resetPassword/${token}`;
      // await sendEmail({
      //   to: user.email,
      //   subject: 'passowrd reset token is only valid for 10minutes',
      //   text: `${URL}`
      // });
      return serviceResponse(
        'success',
        200,
        'reset token has been sent to your mail',
        { user: updatedUser }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async resetUserPassword(query, body) {
    const token = hashToken(query.token);
    const user = await userRepository.findByToken(token);
    if (!user) {
      return serviceResponse('fail', 400, 'Invalid or Expired Token');
    }
    const password = await hashPassword(body.password);
    const updatedUser = await userRepository.update(user.email, {
      password
    });
    return serviceResponse('success', 200, 'Successfully Reset Password', {
      user: updatedUser
    });
  }

  static async forgotStaffPassword(body) {
    try {
      const user = await staffRepository.findByEmail(body.email);
      if (!user) {
        return serviceResponse('fail', 400, 'Incorrect Email');
      }
      const { token, hashedToken } = generateToken();
      const updatedUser = await staffRepository.update(body.email, {
        resetToken: hashedToken,
        resetTokenExpiresAt: Date.now() + 10 * 60 * 1000,
        passwordChangedAt: Date.now()
      });

      const URL = `http://127.0.0.01:8000/api/staff/resetPassword/${token}`;
      // await sendEmail({
      //   to: user.email,
      //   subject: 'passowrd reset token is only valid for 10minutes',
      //   text: `${URL}`
      // });
      return serviceResponse(
        'success',
        200,
        'reset token has been sent to your mail',
        { token, user: updatedUser }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async resetStaffPassword(query, body) {
    const token = hashToken(query.token);
    const user = await staffRepository.findByToken(token);
    if (!user) {
      return serviceResponse('fail', 400, 'Invalid or Expired Token');
    }
    const password = await hashPassword(body.password);
    const updatedUser = await staffRepository.update(user.email, {
      password
    });
    return serviceResponse('success', 200, 'Successfully Reset Password', {
      user: updatedUser
    });
  }

  static async isAdminAuthenticated(headers) {
    try {
      const token = headers['x-auth-token'];
      if (!token) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      const decoded = verifyJWT(token);
      const user = await adminRepository.findById(decoded._id);
      if (!user) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      return serviceResponse('success', 200, '', user);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async isUserAuthenticated(headers) {
    try {
      const token = headers['x-auth-token'];
      if (!token) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      const decoded = verifyJWT(token);
      const user = await userRepository.findById(decoded._id);
      if (!user) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      const userChangedPassword = compareTime(
        decoded.iat,
        user.passwordChangedAt
      );
      if (userChangedPassword) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      return serviceResponse('success', 200, '', user);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = authService;
