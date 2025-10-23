const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger Documentation UI
const swaggerUiHandler = swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Queta Boost API Documentation',
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUiHandler);

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const contactsRoutes = require('./routes/contacts');
const usersRoutes = require('./routes/users');
const logsRoutes = require('./routes/logs');
const passwordResetRoutes = require('./routes/passwordReset');

console.log('📋 Logs routes loaded:', typeof logsRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/password-reset', passwordResetRoutes);

console.log('✅ All routes registered');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar status da API
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: API está funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Queta Boost API is running
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Queta Boost API is running' });
});

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Listar logs de autenticação
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs
 */

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api`);
  });
}

module.exports = app;
