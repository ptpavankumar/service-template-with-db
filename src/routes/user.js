const exp = require('express');
const controller = require('../repository/userrepository'); // TODO: Need to implement DI
const { errorTypes, ValidationError } = require('../models');

const router = new exp.Router();


router.post('/user', (req, res) => (
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

router.get('/user', (req, res) => (
  controller.fetch()
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch(err => (
    res.status(500).send({ errors: err.message })
  ))
));

router.get('/user/:userid', (req, res) => {
  controller.fetchSingle(req.params.userid)
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

router.put('/user/:userid', (req, res) => {
  controller.update(req.params.userid, req.body)
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

router.delete('/user/:userid', (req, res) => (
  controller.deleteSingle(req.params.userid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch(err => (
    res.status(500).send({ errors: err })
  ))
));

module.exports = router;
