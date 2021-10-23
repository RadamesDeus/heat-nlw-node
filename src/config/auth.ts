export default {
  jwt: {
    secret: process.env.JWT_KEY || 'test',
    expiresIn: '1d',
  },
};
