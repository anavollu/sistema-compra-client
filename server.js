const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const forceHTTPS = (req, res, next) => {
  if (!req.secure
    && req.get('x-forwarded-proto') !== 'https'
    && req.get('host')
    && req.get('host').indexOf('localhost') === -1) {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  return next();
};

app.use('/status', (req, res) => res.send('ok'));

app.use(forceHTTPS);

app.use(express.static('dist'));

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
