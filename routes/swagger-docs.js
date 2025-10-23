/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obter usuário atual
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário atual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todos os posts publicados
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts publicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */

/**
 * @swagger
 * /api/posts/slug/{slug}:
 *   get:
 *     summary: Obter post por slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug único do post
 *         example: como-impulsionar-seu-negocio
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Criar novo post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Título do Post
 *               content:
 *                 type: string
 *                 example: <p>Conteúdo completo...</p>
 *               excerpt:
 *                 type: string
 *                 example: Resumo breve
 *               image:
 *                 type: string
 *                 example: https://exemplo.com/imagem.jpg
 *               category:
 *                 type: string
 *                 example: Marketing Digital
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["marketing", "digital"]
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: published
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão (apenas admin)
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualizar post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Post não encontrado
 *   delete:
 *     summary: Deletar post (Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Enviar formulário de contato
 *     tags: [Contatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@exemplo.com
 *               phone:
 *                 type: string
 *                 example: +244 923 456 789
 *               message:
 *                 type: string
 *                 example: Gostaria de mais informações...
 *     responses:
 *       201:
 *         description: Contato enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *   get:
 *     summary: Listar todos os contatos (Admin)
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contatos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Atualizar status do contato (Admin)
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [new, read, responded, archived]
 *                 example: read
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *   delete:
 *     summary: Deletar contato (Admin)
 *     tags: [Contatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contato deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */

module.exports = {};
