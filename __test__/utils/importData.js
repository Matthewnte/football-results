const axios = require('axios');
const { port } = require('../../src/config');

module.exports = () => {
  axios.post(`http://localhost:${port}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
