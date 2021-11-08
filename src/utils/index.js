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
};

module.exports = Common;
