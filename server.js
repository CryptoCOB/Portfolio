const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, 'client', '.env') });

const { connectDB } = require('./server/config/db');
const contactsRoutes = require('./server/routes/contacts');
const projectsRoutes = require('./server/routes/projects');
const qualificationsRoutes = require('./server/routes/qualifications');
const usersRoutes = require('./server/routes/users');
const servicesRoutes = require('./server/routes/services');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Portfolio Backend Server is Running. Navigate to /api for REST endpoints.');
});

// API routes
app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/qualifications', qualificationsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/services', servicesRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect DB:', err);
    process.exit(1);
  });
