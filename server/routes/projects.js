const express = require('express');
const Project = require('../models/Project');
const { crudController } = require('../controllers/factory');
const { auth } = require('../middleware/auth');

const router = express.Router();
const c = crudController(Project);

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', auth, c.create);
router.put('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);
router.delete('/', auth, c.removeAll);

module.exports = router;
