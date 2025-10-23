// Configuração da API
const API_CONFIG = {
  // URL base da API
  baseURL: process.env.API_BASE_URL || 'http://localhost:5000',
  
  // Porta do servidor
  port: process.env.PORT || 5000,
  
  // Ambiente
  environment: process.env.NODE_ENV || 'development',
  
  // CORS origins permitidas
  corsOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:3001'
  ],
  
  // Configurações de JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  
  // Configurações de email
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM
  },
  
  // URLs do frontend
  frontend: {
    baseURL: process.env.FRONTEND_URL || 'http://localhost:3001',
    resetPasswordURL: (token) => `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${token}`,
    loginURL: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/admin`
  }
};

module.exports = API_CONFIG;
