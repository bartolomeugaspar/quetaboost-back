const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Queta Boost API',
      version: '1.0.0',
      description: 'API RESTful completa para o website Queta Boost com sistema de blog dinâmico, painel administrativo e gestão de contatos.',
      contact: {
        name: 'Bartolomeu Gaspar',
        email: 'quetaboost@gmail.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://api.quetaboost.com',
        description: 'Servidor de Produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do endpoint de login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do usuário',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'admin@quetaboost.com',
            },
            name: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'Administrator',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'Papel do usuário no sistema',
              example: 'admin',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do post',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Título do post',
              example: 'Como Impulsionar seu Negócio com Marketing Digital',
            },
            slug: {
              type: 'string',
              description: 'Slug único para URL amigável',
              example: 'como-impulsionar-seu-negocio-com-marketing-digital',
            },
            content: {
              type: 'string',
              description: 'Conteúdo completo do post (HTML permitido)',
              example: '<p>Conteúdo completo do post...</p>',
            },
            excerpt: {
              type: 'string',
              description: 'Resumo breve do post',
              example: 'Descubra estratégias eficazes de marketing digital...',
            },
            image: {
              type: 'string',
              format: 'uri',
              description: 'URL da imagem de destaque',
              example: 'https://exemplo.com/imagem.jpg',
            },
            category: {
              type: 'string',
              description: 'Categoria do post',
              example: 'Marketing Digital',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Tags do post',
              example: ['marketing', 'digital', 'estratégia'],
            },
            status: {
              type: 'string',
              enum: ['draft', 'published'],
              description: 'Status de publicação',
              example: 'published',
            },
            author_id: {
              type: 'integer',
              description: 'ID do autor',
              example: 1,
            },
            views: {
              type: 'integer',
              description: 'Número de visualizações',
              example: 150,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
            },
          },
        },
        Contact: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do contato',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Nome do contato',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do contato',
              example: 'joao@exemplo.com',
            },
            phone: {
              type: 'string',
              description: 'Telefone do contato',
              example: '+244 923 456 789',
            },
            message: {
              type: 'string',
              description: 'Mensagem enviada',
              example: 'Gostaria de mais informações sobre os serviços...',
            },
            status: {
              type: 'string',
              enum: ['new', 'read', 'responded', 'archived'],
              description: 'Status do contato',
              example: 'new',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
          },
        },
        AuthLog: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do log',
              example: 1,
            },
            user_id: {
              type: 'integer',
              description: 'ID do usuário (pode ser null)',
              example: 1,
            },
            user_email: {
              type: 'string',
              format: 'email',
              description: 'Email usado na tentativa de autenticação',
              example: 'admin@quetaboost.com',
            },
            user_name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'Administrator',
            },
            action: {
              type: 'string',
              enum: ['login', 'logout', 'failed_login', 'password_reset'],
              description: 'Tipo de ação realizada',
              example: 'login',
            },
            status: {
              type: 'string',
              enum: ['success', 'failed', 'pending'],
              description: 'Status da ação',
              example: 'success',
            },
            ip_address: {
              type: 'string',
              description: 'Endereço IP de origem',
              example: '192.168.1.1',
            },
            user_agent: {
              type: 'string',
              description: 'User agent do navegador/cliente',
              example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            },
            error_message: {
              type: 'string',
              description: 'Mensagem de erro (se houver)',
              example: 'Invalid password',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora do log',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Invalid credentials',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints de autenticação e gerenciamento de usuários',
      },
      {
        name: 'Posts',
        description: 'Endpoints para gerenciamento de posts do blog',
      },
      {
        name: 'Contatos',
        description: 'Endpoints para gerenciamento de contatos',
      },
      {
        name: 'Logs',
        description: 'Endpoints para visualização e gerenciamento de logs de autenticação',
      },
      {
        name: 'Sistema',
        description: 'Endpoints de sistema e monitoramento',
      },
    ],
  },
  apis: [
    './routes/*.js', 
    './server.js', 
    './routes/swagger-docs.js',
    './routes/logs.js'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
