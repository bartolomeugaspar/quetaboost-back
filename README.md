# 🚀 Queta Boost - Backend API

Backend completo para o website Queta Boost com sistema de blog dinâmico, painel administrativo e gestão de contatos.

## 🌟 Características

- ✅ **API RESTful** completa com Express.js
- ✅ **Supabase (PostgreSQL)** como banco de dados
- ✅ **Autenticação JWT** com bcrypt
- ✅ **Sistema de Blog** com CRUD completo
- ✅ **Gestão de Contatos** com status
- ✅ **Painel Admin** protegido
- ✅ **Middleware de Autenticação** e autorização
- ✅ **Validação de dados**

## 📋 Pré-requisitos

- Node.js 14+ instalado
- Conta no Supabase (gratuita)
- npm ou yarn

## 🛠️ Tecnologias

- **Express.js** - Framework web
- **Supabase** - Banco de dados PostgreSQL
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **CORS** - Segurança
- **dotenv** - Variáveis de ambiente

## ⚡ Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# 3. Criar tabelas no Supabase (veja QUICK_START.md)

# 4. Criar usuário admin
npm run create-admin

# 5. Iniciar servidor
npm start
```

## 📁 Estrutura do Projeto

```
quetaboost-back/
├── config/
│   └── supabase.js          # Configuração do Supabase
├── middleware/
│   └── auth.js              # Middleware de autenticação JWT
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   ├── posts.js             # Rotas de posts do blog
│   └── contacts.js          # Rotas de contatos
├── scripts/
│   └── createAdmin.js       # Script para criar admin
├── .env.example             # Exemplo de variáveis de ambiente
├── server.js                # Servidor principal
├── package.json
├── QUICK_START.md          # Guia rápido de configuração
└── README.md
```

## 🔐 Autenticação

### Registro de Usuário
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

Resposta:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário",
    "role": "user"
  }
}
```

## 📝 Endpoints da API

### Posts (Públicos)

#### Listar Posts Publicados
```bash
GET /api/posts
```

#### Obter Post por Slug
```bash
GET /api/posts/slug/:slug
```

#### Posts por Categoria
```bash
GET /api/posts/category/:category
```

### Posts (Admin - Requer Autenticação)

#### Listar Todos os Posts
```bash
GET /api/posts/admin/all
Authorization: Bearer {token}
```

#### Criar Post
```bash
POST /api/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Título do Post",
  "content": "Conteúdo completo...",
  "excerpt": "Resumo breve",
  "image": "https://exemplo.com/imagem.jpg",
  "category": "Marketing Digital",
  "tags": ["marketing", "digital"],
  "status": "published"
}
```

#### Atualizar Post
```bash
PUT /api/posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Novo Título",
  "status": "published"
}
```

#### Deletar Post
```bash
DELETE /api/posts/:id
Authorization: Bearer {token}
```

### Contatos

#### Enviar Formulário (Público)
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+244 923 456 789",
  "message": "Gostaria de mais informações..."
}
```

#### Listar Contatos (Admin)
```bash
GET /api/contacts
Authorization: Bearer {token}
```

#### Atualizar Status do Contato (Admin)
```bash
PUT /api/contacts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "read"
}
```

Status disponíveis: `new`, `read`, `responded`, `archived`

## 🗄️ Estrutura do Banco de Dados

### Tabela: users
```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hash bcrypt)
- name (VARCHAR)
- role (VARCHAR - 'user' ou 'admin')
- created_at (TIMESTAMP)
```

### Tabela: posts
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- slug (VARCHAR UNIQUE)
- content (TEXT)
- excerpt (TEXT)
- image (VARCHAR)
- category (VARCHAR)
- tags (TEXT[])
- status (VARCHAR - 'draft' ou 'published')
- author_id (INTEGER FK)
- views (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: contacts
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- message (TEXT)
- status (VARCHAR)
- created_at (TIMESTAMP)
```

## 🔒 Segurança

- Senhas hashadas com bcrypt (10 rounds)
- Autenticação JWT com expiração de 7 dias
- CORS habilitado
- Validação de dados em todas as rotas
- Middleware de autorização para rotas admin

## 🚀 Scripts Disponíveis

```bash
# Iniciar servidor em produção
npm start

# Iniciar servidor em desenvolvimento (com nodemon)
npm run dev

# Criar usuário administrador
npm run create-admin
```

## 🌐 Variáveis de Ambiente

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon
JWT_SECRET=sua_chave_secreta_jwt_forte
```

## 📊 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"
**Solução**: Verifique se o arquivo `.env` existe e contém `SUPABASE_URL` e `SUPABASE_ANON_KEY`

### Erro: "relation does not exist"
**Solução**: Execute os comandos SQL no Supabase para criar as tabelas (veja QUICK_START.md)

### Erro: "Invalid token"
**Solução**: Faça login novamente para obter um novo token JWT

### Servidor não inicia
**Solução**: 
1. Verifique se a porta 5000 está livre
2. Confirme que todas as dependências estão instaladas
3. Verifique os logs de erro no terminal

## 📝 Credenciais Padrão do Admin

Após executar `npm run create-admin`:

- **Email**: admin@quetaboost.com
- **Senha**: admin123

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

## 🔄 Integração com Frontend

O frontend React deve fazer requisições para:
```
http://localhost:5000/api
```

Para produção, atualize a URL base no frontend para o domínio do seu servidor.

## 📚 Documentação Adicional

- `QUICK_START.md` - Guia rápido de configuração
- `.env.example` - Exemplo de variáveis de ambiente

## 👨‍💻 Desenvolvedor

**Bartolomeu Gaspar**

## 📄 Licença

© 2025 Queta Boost. Todos os direitos reservados.

---

**Queta Boost** - Impulsionando o crescimento de negócios em Angola 🇦🇴
