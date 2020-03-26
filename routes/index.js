const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

const models = require('../models');

models.event.destroy({
  where: {},
  truncate: true,
});
models.actor.destroy({
  where: {},
  truncate: true,
});
models.repository.destroy({
  where: {},
  truncate: true,
});


module.exports = router;
