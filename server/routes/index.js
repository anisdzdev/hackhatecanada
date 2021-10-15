const ai = require('../src/ai/routes');

module.exports = (app) => {
  app.use('/ai', ai);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
