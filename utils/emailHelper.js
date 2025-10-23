const supabase = require('../config/supabase');

/**
 * Envia email de recuperação de senha usando Supabase
 * @param {string} email - Email do destinatário
 * @param {string} resetLink - Link de reset de senha
 * @param {string} userName - Nome do usuário (opcional)
 */
async function sendPasswordResetEmail(email, resetLink, userName = 'Usuário') {
  try {
    // Template HTML do email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #000000, #1a1a1a);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #C9A05F;
            margin-bottom: 10px;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .button {
            display: inline-block;
            background: #C9A05F;
            color: white !important;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .button:hover {
            background: #b8904e;
          }
          .info-box {
            background: #f9fafb;
            border-left: 4px solid #C9A05F;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .warning {
            color: #dc2626;
            font-size: 14px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">QUETA BOOST</div>
          <p style="margin: 0; color: #C9A05F;">Recuperação de Senha</p>
        </div>
        
        <div class="content">
          <h2 style="color: #1f2937; margin-top: 0;">Olá, ${userName}!</h2>
          
          <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Queta Boost</strong>.</p>
          
          <p>Para criar uma nova senha, clique no botão abaixo:</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Redefinir Senha</a>
          </div>
          
          <div class="info-box">
            <strong>⏰ Atenção:</strong> Este link é válido por <strong>1 hora</strong> e pode ser usado apenas uma vez.
          </div>
          
          <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
          <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetLink}</p>
          
          <div class="warning">
            <strong>⚠️ Não solicitou esta alteração?</strong><br>
            Se você não pediu para redefinir sua senha, ignore este email. Sua senha permanecerá inalterada.
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>Queta Boost</strong></p>
          <p style="margin: 0;">Este é um email automático. Por favor, não responda.</p>
          <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Queta Boost. Todos os direitos reservados.</p>
        </div>
      </body>
      </html>
    `;

    // Texto alternativo (para clientes que não suportam HTML)
    const emailText = `
Olá, ${userName}!

Recebemos uma solicitação para redefinir a senha da sua conta no Queta Boost.

Para criar uma nova senha, acesse o link abaixo:
${resetLink}

⏰ Atenção: Este link é válido por 1 hora e pode ser usado apenas uma vez.

⚠️ Não solicitou esta alteração?
Se você não pediu para redefinir sua senha, ignore este email. Sua senha permanecerá inalterada.

---
Queta Boost
Este é um email automático. Por favor, não responda.
© ${new Date().getFullYear()} Queta Boost. Todos os direitos reservados.
    `;

    // Enviar email usando a API do Supabase
    // Nota: Isso requer configuração do serviço de email no Supabase Dashboard
    console.log('📧 Enviando email de recuperação para:', email);
    console.log('🔗 Link:', resetLink);

    // Como o Supabase não tem uma API direta para envio de emails customizados,
    // vamos usar uma abordagem alternativa: Edge Functions ou serviço externo
    
    // Por enquanto, vamos apenas logar (você precisará configurar um serviço de email)
    console.log('✅ Email preparado (configurar serviço de envio)');
    
    return {
      success: true,
      message: 'Email preparado para envio',
      // Em produção, aqui você integraria com:
      // - Supabase Edge Functions
      // - SendGrid
      // - Mailgun
      // - AWS SES
      // - Nodemailer com SMTP
    };

  } catch (error) {
    console.error('❌ Erro ao preparar email:', error);
    throw error;
  }
}

module.exports = {
  sendPasswordResetEmail
};
