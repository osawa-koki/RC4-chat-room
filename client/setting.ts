
const Env = require('./next.config.js');
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8080',
  title: '🏠 RC4 Chat Room 🏠',
};

export default setting;
