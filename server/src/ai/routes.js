const express = require('express');

const controller = require('./controller');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemaValidation');

const router = express.Router();

router.get('/', (req, res) => {
  controller.check(req, res);
});

router.post('/analyse', validateSchemas.inputs(schemas.valid_link, 'body'), (req, res) => {
  controller.analyse(req, res);
});

router.post('/report', validateSchemas.inputs(schemas.valid_link, 'body'),(req, res) => {
  controller.report(req, res);
});

router.delete('/', (req, res) => {
  //Resets the database
  controller.reset(res);
})

module.exports = router;
