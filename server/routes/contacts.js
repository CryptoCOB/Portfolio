const express = require('express');
const Contact = require('../models/Contact');
const { crudController } = require('../controllers/factory');

const router = express.Router();
const c = crudController(Contact);

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
router.delete('/', c.removeAll);

module.exports = router;
