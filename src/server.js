const app = require('./app');
const { port } = require('./config');

app.listen(() => {
  console.log(`listening on port ${port}`);
});
