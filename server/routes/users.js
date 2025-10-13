const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { crudController } = require('../controllers/factory');

const router = express.Router();
const c = crudController(User);

// Auth routes MUST come before generic /:id routes
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email }).exec();
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, created: new Date() });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '2h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// Basic CRUD for users (after specific routes)
router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
router.delete('/', c.removeAll);

module.exports = router;
