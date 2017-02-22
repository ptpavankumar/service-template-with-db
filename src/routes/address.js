const exp = require('express');
const controller = require('../repository/addressrepository'); // TODO: Need to implement DI
const { errorTypes, ValidationError } = require('../models');

const router = new exp.Router();


router.post('/address', (req, res) => (
  controller.create(req.body)
  .then(result => (
    res.status(201).send({ data: result.data })
  ))
  .catch((err) => {
    if (err instanceof ValidationError) {
      return res.status(400).send({
        errors: err.message,
      });
    }

    return res.status(500).send({ errors: err.code });
  })
));

router.get('/address', (req, res) => (
  controller.fetch()
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch(err => (
    res.status(500).send({ errors: err.message })
  ))
));

router.get('/address/:addressid', (req, res) => {
  controller.fetchSingle(req.params.addressid)
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch((err) => {
    if (err.message === errorTypes.Unavailable) {
      return res.status(404).send();
    }

    return res.status(500).send({ errors: err.message });
  });
});

router.put('/address/:addressid', (req, res) => {
  controller.update(req.params.addressid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch((err) => {
    if (err.message === errorTypes.Unavailable) {
      return res.status(404).send();
    }

    return res.status(500).send({ errors: err.message });
  })
  .catch((err) => {
    console.log(err); // eslint-disable-line no-console
    return res.status(500).send({ errors: err });
  });
});

router.delete('/address/:addressid', (req, res) => (
  controller.deleteSingle(req.params.addressid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch(err => (
    res.status(500).send({ errors: err })
  ))
));

module.exports = router;
