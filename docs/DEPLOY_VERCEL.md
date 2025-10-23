# 🚀 Deploy do Backend na Vercel

## 📋 Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Conta no Supabase com projeto configurado
3. Código no GitHub

## 🔧 Passo a Passo

### 1. Preparar o Projeto

✅ Arquivos já criados:
- `vercel.json` - Configuração da Vercel
- `.vercelignore` - Arquivos a ignorar

### 2. Deploy na Vercel

#### Opção A: Via Dashboard (Recomendado)

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New"** → **"Project"**
3. Importe o repositório: `bartolomeugaspar/quetaboost-back`
4. Configure as variáveis de ambiente (veja abaixo)
5. Clique em **"Deploy"**

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### 3. Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

```env
# Supabase
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_do_supabase

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro

# API e Frontend
API_BASE_URL=https://seu-projeto.vercel.app
FRONTEND_URL=https://seu-frontend.vercel.app

# Porta (Vercel define automaticamente)
PORT=5000

# Ambiente
NODE_ENV=production
```

### 4. Obter URL do Backend

Após o deploy, a Vercel fornecerá uma URL como:
```
https://quetaboost-back.vercel.app
```

### 5. Atualizar Frontend

No frontend, configure o `.env.production`:

```env
REACT_APP_API_URL=https://quetaboost-back.vercel.app
```

## ✅ Verificar Deploy

Teste os endpoints:

```bash
# Health check
curl https://quetaboost-back.vercel.app/api

# Swagger docs
https://quetaboost-back.vercel.app/api-docs
```

## 🔒 Segurança

### Configurar CORS

No arquivo `server.js`, as origens já estão configuradas via `API_CONFIG.corsOrigins`.

Certifique-se que `FRONTEND_URL` está correto nas variáveis de ambiente.

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente para testar

### Erro: "Database connection failed"
- Verifique as variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY`
- Teste a conexão localmente primeiro

### Erro: "CORS blocked"
- Adicione a URL do frontend em `FRONTEND_URL`
- Verifique `corsOrigins` no `config/api.js`

## 📊 Monitoramento

- **Logs**: Vercel Dashboard → Projeto → Functions
- **Analytics**: Vercel Dashboard → Analytics
- **Errors**: Integre com Sentry (opcional)

## 🔄 Redeploy

### Automático
Qualquer push para `main` no GitHub fará redeploy automático.

### Manual
```bash
vercel --prod
```

## 📝 Notas Importantes

1. **Serverless Functions**: A Vercel executa como serverless, não como servidor tradicional
2. **Cold Start**: Primeira requisição pode ser mais lenta
3. **Timeout**: Limite de 10 segundos por requisição (plano gratuito)
4. **Limites**: 
   - 100GB bandwidth/mês (gratuito)
   - 100 deployments/dia

## 🎯 Próximos Passos

1. ✅ Deploy do backend na Vercel
2. ✅ Deploy do frontend na Vercel/Netlify
3. ✅ Configurar domínio customizado (opcional)
4. ✅ Configurar SSL (automático na Vercel)
5. ✅ Testar todas as funcionalidades

## 🆘 Suporte

- Documentação Vercel: https://vercel.com/docs
- Suporte: https://vercel.com/support
