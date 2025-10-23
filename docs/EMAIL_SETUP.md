# 📧 Configuração de Envio de Emails

O sistema de recuperação de senha está preparado para enviar emails. Para ativar o envio real, você precisa configurar um serviço de email.

## 🎯 Opções de Serviço de Email

### Opção 1: Supabase Edge Functions (Recomendado para Supabase)

1. **Criar Edge Function no Supabase:**
   ```bash
   supabase functions new send-email
   ```

2. **Configurar serviço de email externo:**
   - SendGrid
   - Resend
   - Mailgun

3. **Deploy da função:**
   ```bash
   supabase functions deploy send-email
   ```

### Opção 2: Nodemailer com Gmail (Mais Simples)

#### Passo 1: Instalar Nodemailer
```bash
npm install nodemailer
```

#### Passo 2: Configurar Gmail

1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas"
3. Vá em "Senhas de app"
4. Crie uma senha para "Email"
5. Copie a senha gerada

#### Passo 3: Adicionar ao .env
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=Queta Boost <seu-email@gmail.com>
```

#### Passo 4: Atualizar emailHelper.js

Substitua o conteúdo de `utils/emailHelper.js` por:

```javascript
const nodemailer = require('nodemailer');

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendPasswordResetEmail(email, resetLink, userName = 'Usuário') {
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

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: '🔐 Recuperação de Senha - Queta Boost',
    html: emailHtml,
    text: `
Olá, ${userName}!

Recebemos uma solicitação para redefinir a senha da sua conta no Queta Boost.

Para criar uma nova senha, acesse o link abaixo:
${resetLink}

⏰ Atenção: Este link é válido por 1 hora e pode ser usado apenas uma vez.

⚠️ Não solicitou esta alteração?
Se você não pediu para redefinir sua senha, ignore este email.

---
Queta Boost
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw error;
  }
}

module.exports = {
  sendPasswordResetEmail
};
```

### Opção 3: SendGrid (Profissional)

1. **Criar conta:** https://sendgrid.com
2. **Obter API Key**
3. **Instalar:**
   ```bash
   npm install @sendgrid/mail
   ```
4. **Configurar no .env:**
   ```env
   SENDGRID_API_KEY=sua-api-key
   EMAIL_FROM=noreply@quetaboost.com
   ```

## 🧪 Testar Email

Após configurar, teste com:

```bash
curl -X POST http://localhost:5000/api/password-reset/request \
  -H "Content-Type: application/json" \
  -d '{"email":"seu-email@gmail.com"}'
```

Verifique sua caixa de entrada!

## 📝 Notas

- Em **desenvolvimento**: O link também aparece na resposta da API
- Em **produção**: Remova o `dev_link` da resposta
- Configure SPF/DKIM para evitar spam
- Use domínio próprio em produção

## 🔒 Segurança

- ✅ Nunca exponha credenciais de email
- ✅ Use variáveis de ambiente
- ✅ Ative 2FA no Gmail
- ✅ Use senhas de app, não a senha principal
