const Router = require('express').Router;

const packageJson = require('../../package.json');

const router = new Router();

router.get('/_health', (req, res) => {
  if (req.headers['content-type'] === 'application/json') {
    return res.status(200).send({ version: packageJson.version });
  }

  return res.status(200).send(`<html><body>Im healthy running version <i><b>${packageJson.version}</b></i>!</body></html>`);
});

module.exports = router;
