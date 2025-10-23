# 🚀 Guia Rápido - Queta Boost Backend

## ⚠️ IMPORTANTE: Configure o Supabase Primeiro!

Antes de iniciar o servidor, você precisa:

### 1. Criar Projeto no Supabase

1. Acesse https://supabase.com e crie uma conta gratuita
2. Crie um novo projeto
3. Anote a **URL do projeto** e a **anon key**

### 2. Criar as Tabelas no Banco de Dados

No painel do Supabase, vá em **SQL Editor** e execute:

```sql
-- Tabela de Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image VARCHAR(1000),
  category VARCHAR(100) DEFAULT 'Geral',
  tags TEXT[],
  status VARCHAR(50) DEFAULT 'draft',
  author_id INTEGER REFERENCES users(id),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Contatos
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_contacts_status ON contacts(status);
```

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env` e adicione suas credenciais do Supabase:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon_aqui
JWT_SECRET=sua_chave_secreta_jwt
```

### 4. Criar Usuário Admin

Execute o script para criar o usuário administrador:

```bash
npm run create-admin
```

**Credenciais padrão:**
- Email: admin@quetaboost.com
- Senha: admin123

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

### 5. Iniciar o Servidor

```bash
npm start
```

O servidor estará rodando em: http://localhost:5000

## 📡 Endpoints Disponíveis

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual

### Posts (Públicos)
- `GET /api/posts` - Listar posts publicados
- `GET /api/posts/slug/:slug` - Obter post por slug
- `GET /api/posts/category/:category` - Posts por categoria

### Posts (Admin - requer autenticação)
- `GET /api/posts/admin/all` - Todos os posts (incluindo rascunhos)
- `POST /api/posts` - Criar novo post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post

### Contatos
- `POST /api/contacts` - Enviar formulário de contato (público)
- `GET /api/contacts` - Listar contatos (admin)
- `PUT /api/contacts/:id` - Atualizar status (admin)
- `DELETE /api/contacts/:id` - Deletar contato (admin)

### Health Check
- `GET /api/health` - Verificar status da API

## 🔐 Autenticação

Para rotas protegidas, inclua o token JWT no header:

```
Authorization: Bearer seu_token_jwt_aqui
```

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe e contém as credenciais corretas

### Erro: "relation does not exist"
- Execute os comandos SQL no Supabase para criar as tabelas

### Erro de conexão
- Verifique se a URL e a chave do Supabase estão corretas
- Confirme que o projeto Supabase está ativo

## 📚 Próximos Passos

1. Configure o frontend para conectar com este backend
2. Crie posts de exemplo através do painel admin
3. Teste todas as funcionalidades
4. Personalize conforme necessário

## 🆘 Suporte

Para problemas ou dúvidas, verifique:
- Logs do servidor no terminal
- Console do navegador (frontend)
- Painel do Supabase para erros de banco de dados
