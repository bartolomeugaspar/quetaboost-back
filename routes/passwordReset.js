const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

/**
 * @swagger
 * /api/password-reset/request:
 *   post:
 *     summary: Solicitar reset de senha
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@quetaboost.com
 *     responses:
 *       200:
 *         description: Email de recuperação enviado
 *       404:
 *         description: Email não encontrado
 */
router.post('/request', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // Verificar se o usuário existe
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', email)
      .single();

    // Por segurança, sempre retornar sucesso mesmo se o email não existir
    if (error || !user) {
      return res.json({ 
        message: 'Se o email existir, você receberá instruções para redefinir sua senha.' 
      });
    }

    // Gerar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    const { error: updateError } = await supabase
      .from('users')
      .update({
        reset_token: resetTokenHash,
        reset_token_expiry: resetTokenExpiry.toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }

    // TODO: Enviar email com o link de reset
    // Por enquanto, retornar o token (APENAS PARA DESENVOLVIMENTO)
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    console.log('🔑 Reset Password Link:', resetLink);
    console.log('📧 Email:', email);

    res.json({
      message: 'Se o email existir, você receberá instruções para redefinir sua senha.',
      // REMOVER EM PRODUÇÃO:
      dev_link: resetLink,
      dev_note: 'Em produção, este link será enviado por email'
    });

  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
});

/**
 * @swagger
 * /api/password-reset/verify:
 *   post:
 *     summary: Verificar token de reset
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Token inválido ou expirado
 */
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token é obrigatório' });
    }

    // Hash do token recebido
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar usuário com este token
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, reset_token_expiry')
      .eq('reset_token', resetTokenHash)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    // Verificar se o token expirou
    const now = new Date();
    const expiry = new Date(user.reset_token_expiry);

    if (now > expiry) {
      return res.status(400).json({ error: 'Token expirado. Solicite um novo link de recuperação.' });
    }

    res.json({ 
      message: 'Token válido',
      email: user.email 
    });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: 'Erro ao verificar token' });
  }
});

/**
 * @swagger
 * /api/password-reset/reset:
 *   post:
 *     summary: Redefinir senha
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou senha inválida
 */
router.post('/reset', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });
    }

    // Validar senha
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Hash do token recebido
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar usuário com este token
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, reset_token_expiry')
      .eq('reset_token', resetTokenHash)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    // Verificar se o token expirou
    const now = new Date();
    const expiry = new Date(user.reset_token_expiry);

    if (now > expiry) {
      return res.status(400).json({ error: 'Token expirado. Solicite um novo link de recuperação.' });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha e limpar token
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_token_expiry: null
      })
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }

    console.log('✅ Password reset successful for:', user.email);

    res.json({ 
      message: 'Senha redefinida com sucesso! Você já pode fazer login com a nova senha.' 
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Erro ao redefinir senha' });
  }
});

module.exports = router;
