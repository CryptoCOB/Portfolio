const express = require('express');
const Service = require('../models/Service');
const { crudController } = require('../controllers/factory');
const { auth } = require('../middleware/auth');

const router = express.Router();
const c = crudController(Service);

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', auth, c.create);
router.put('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);
router.delete('/', auth, c.removeAll);

module.exports = router;
