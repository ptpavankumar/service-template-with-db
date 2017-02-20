const exp = require('express');
const controller = require('../controllers/addresscontroller');

const router = new exp.Router();


router.post('/address', (req, res) => {
  controller.create(req.body)
  .then((result) => {
    if (result.errors) {
      return res.status(400).send({
        errors: result.errors,
      });
    }

    return res.status(201).send({ data: result.data });
  })
  .catch(err => (
    res.status(500).send({ errors: err })
  ));
});

router.get('/address', (req, res) => {
  controller.fetch()
  .then((result) => {
    if (result.errors) {
      return res.status(400).send({
        errors: result.errors,
      });
    }

    return res.status(200).send(result.data);
  })
  .catch(err => (
    res.status(500).send({ errors: err })
  ));
});

router.get('/user/:userid', (req, res) => {
  controller.fetchSingle(req.params.userid)
  .then((result) => {
    if (result.errors) {
      return res.status(400).send({
        errors: result.errors,
      });
    }

    if (!result.data) {
      return res.status(404).send();
    }

    return res.status(200).send(result.data);
  })
  .catch(err => (
      res.status(500).send({ errors: err })
  ));
});

router.put('/user/:userid', (req, res) => {
  controller.update(req.params.userid, req.body)
  .then((result) => {
    if (result.errors) {
      return res.status(400).send({
        errors: result.errors,
      });
    }

    return res.status(200).send(result.data);
  })
  .catch(err => (
      res.status(500).send({ errors: err })
  ));
});

router.delete('/user/:userid', (req, res) => {
  controller.deleteSingle(req.params.userid, req.body)
  .then((result) => {
    if (result.errors) {
      return res.status(400).send({
        errors: result.errors,
      });
    }

    return res.status(200).send(result.data);
  })
  .catch(err => (
      res.status(500).send({ errors: err })
  ));
});

module.exports = router;
