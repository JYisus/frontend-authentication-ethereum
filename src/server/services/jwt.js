const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.json');

function createToken(user) {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.secret);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.secret);
      if (payload.exp <= moment().unix()) {
        reject ({
          status: 401,
          message: 'El token ha expirado'
        });
      }
      // console.log(`Sub: ${payload.sub}`)
      resolve(payload.sub);
    } catch (err) {
      reject ({
        status: 500,
        message: 'invalid token'
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken
}