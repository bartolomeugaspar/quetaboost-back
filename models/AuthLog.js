const mongoose = require('mongoose');

const authLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  user_email: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    default: null
  },
  action: {
    type: String,
    enum: ['login', 'logout', 'failed_login', 'password_reset'],
    default: 'login'
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  },
  ip_address: {
    type: String,
    default: null
  },
  user_agent: {
    type: String,
    default: null
  },
  error_message: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Índices para melhor performance
authLogSchema.index({ user_email: 1 });
authLogSchema.index({ status: 1 });
authLogSchema.index({ created_at: -1 });
authLogSchema.index({ user_id: 1 });

module.exports = mongoose.model('AuthLog', authLogSchema);
