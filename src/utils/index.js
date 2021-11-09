const { Duplex } = require('stream');

const Common = {
  bufferToStream: (myBuuffer) => {
    const tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
  },

  formatDate: (d, char) => {
    const [dd, mm, yy] = d.split(char);
    return new Date(`${yy}-${mm}-${dd}`);
  },

  calculateQueryParams: (query) => {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 10;
    const offset = (page - 1) * limit;

    return { limit, offset };
  },
};

module.exports = Common;
