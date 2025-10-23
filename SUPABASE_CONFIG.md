# 🔑 Como Obter as Credenciais do Supabase

## 📍 Passo a Passo Visual

### 1. Acesse o Dashboard do Supabase
- Vá para: https://supabase.com/dashboard
- Faça login na sua conta
- Selecione seu projeto (ou crie um novo)

### 2. Navegue até as Configurações da API
```
Dashboard → Seu Projeto → Settings (⚙️) → API
```

Ou acesse diretamente:
```
https://supabase.com/dashboard/project/[SEU_PROJETO_ID]/settings/api
```

### 3. Copie as Credenciais Necessárias

Você verá uma página com várias informações. Copie:

#### 📌 Project URL
```
Seção: "Project URL"
Exemplo: https://xyzabc123.supabase.co
```

#### 📌 anon public (API Key)
```
Seção: "Project API keys"
Procure por: "anon" ou "public"
Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4ODg4ODg4LCJleHAiOjE5OTQ0NjQ4ODh9.abc123def456...
```

⚠️ **IMPORTANTE**: 
- Use a chave **anon/public** (não a service_role)
- A service_role tem acesso total e NÃO deve ser exposta no frontend

## 🔐 Diferença entre as Chaves

### SUPABASE_ANON_KEY (do Supabase)
- ✅ Chave pública do Supabase
- ✅ Usada para conectar ao banco de dados
- ✅ Pode ser exposta no frontend (com RLS habilitado)
- 📍 Encontrada em: Settings → API → "anon public"

### JWT_SECRET (do seu Backend)
- ✅ Chave PRIVADA do seu backend
- ✅ Usada para assinar tokens JWT da sua aplicação
- ❌ NUNCA deve ser exposta
- 📍 Você cria esta chave (string aleatória forte)

## 📝 Exemplo de .env Configurado

```env
# Server
PORT=5000
NODE_ENV=development

# Supabase (SUAS credenciais)
SUPABASE_URL=https://xyzabc123.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4ODg4ODg4LCJleHAiOjE5OTQ0NjQ4ODh9.abc123def456ghi789...

# JWT do Backend (VOCÊ cria)
JWT_SECRET=minha_chave_super_secreta_aleatoria_123456789
```

## 🛡️ Segurança

### ✅ Boas Práticas:
1. **Nunca** commite o arquivo `.env` no Git
2. Use `.env.example` como template (sem valores reais)
3. Em produção, use variáveis de ambiente do servidor
4. Gere um JWT_SECRET forte e único

### 🔒 Gerando JWT_SECRET Forte

Você pode gerar uma chave forte usando:

**Node.js:**
```javascript
require('crypto').randomBytes(64).toString('hex')
```

**Online (seguro):**
```bash
# No terminal Linux/Mac
openssl rand -hex 64
```

**Ou use um gerador online:**
- https://www.grc.com/passwords.htm
- https://randomkeygen.com/

## 🚨 Troubleshooting

### Erro: "Invalid API key"
- ✅ Verifique se copiou a chave **anon** (não service_role)
- ✅ Confirme que não há espaços extras antes/depois
- ✅ Certifique-se de que o projeto Supabase está ativo

### Erro: "Project URL is invalid"
- ✅ URL deve começar com `https://`
- ✅ Deve terminar com `.supabase.co`
- ✅ Não inclua `/` no final

### Erro: "Missing Supabase environment variables"
- ✅ Arquivo `.env` existe na raiz do projeto?
- ✅ Variáveis estão escritas corretamente?
- ✅ Reiniciou o servidor após editar o `.env`?

## 📚 Recursos Adicionais

- [Documentação Oficial do Supabase](https://supabase.com/docs)
- [Supabase API Settings](https://supabase.com/docs/guides/api)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Checklist de Configuração

- [ ] Conta criada no Supabase
- [ ] Projeto criado no Supabase
- [ ] Tabelas criadas (users, posts, contacts)
- [ ] SUPABASE_URL copiada
- [ ] SUPABASE_ANON_KEY copiada
- [ ] JWT_SECRET gerada (forte e aleatória)
- [ ] Arquivo `.env` configurado
- [ ] Servidor reiniciado
- [ ] Teste de conexão realizado

---

Após configurar tudo, execute:
```bash
npm start
```

Se aparecer: `🚀 Server running on port 5000` → Tudo certo! ✅
