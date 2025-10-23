const AuthLog = require('../models/AuthLog');

/**
 * Registrar log de autenticação
 * @param {Object} data - Dados do log
 * @param {String} data.user_id - ID do usuário (opcional)
 * @param {String} data.user_email - Email do usuário
 * @param {String} data.user_name - Nome do usuário (opcional)
 * @param {String} data.action - Ação (login, logout, failed_login, password_reset)
 * @param {String} data.status - Status (success, failed, pending)
 * @param {String} data.ip_address - Endereço IP
 * @param {String} data.user_agent - User agent do navegador
 * @param {String} data.error_message - Mensagem de erro (opcional)
 */
async function logAuth(data) {
  try {
    const log = new AuthLog({
      user_id: data.user_id || null,
      user_email: data.user_email,
      user_name: data.user_name || null,
      action: data.action || 'login',
      status: data.status || 'success',
      ip_address: data.ip_address || null,
      user_agent: data.user_agent || null,
      error_message: data.error_message || null
    });

    await log.save();
    return log;
  } catch (error) {
    console.error('Error creating auth log:', error);
    // Não lançar erro para não interromper o fluxo principal
    return null;
  }
}

/**
 * Registrar login bem-sucedido
 */
async function logSuccessfulLogin(user, req) {
  return await logAuth({
    user_id: user._id || user.id,
    user_email: user.email,
    user_name: user.name,
    action: 'login',
    status: 'success',
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.headers['user-agent']
  });
}

/**
 * Registrar tentativa de login falhada
 */
async function logFailedLogin(email, errorMessage, req) {
  return await logAuth({
    user_email: email,
    action: 'failed_login',
    status: 'failed',
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.headers['user-agent'],
    error_message: errorMessage
  });
}

/**
 * Registrar logout
 */
async function logLogout(user, req) {
  return await logAuth({
    user_id: user._id || user.id,
    user_email: user.email,
    user_name: user.name,
    action: 'logout',
    status: 'success',
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.headers['user-agent']
  });
}

/**
 * Registrar reset de senha
 */
async function logPasswordReset(user, req) {
  return await logAuth({
    user_id: user._id || user.id,
    user_email: user.email,
    user_name: user.name,
    action: 'password_reset',
    status: 'success',
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.headers['user-agent']
  });
}

module.exports = {
  logAuth,
  logSuccessfulLogin,
  logFailedLogin,
  logLogout,
  logPasswordReset
};
