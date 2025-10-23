const express = require('express');
const router = express.Router();
const AuthLog = require('../models/AuthLog');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Teste simples
router.get('/test', (req, res) => {
  console.log('✅ Rota de teste /api/logs/test funcionando!');
  res.json({ message: 'Logs route is working!' });
});

// Teste sem middleware
router.get('/test-no-auth', async (req, res) => {
  console.log('🔍 GET /api/logs/test-no-auth chamado');
  try {
    const logs = await AuthLog.find({}, { limit: 10 });
    res.json({
      success: true,
      logs: logs,
      total: logs.length,
      message: 'Rota funcionando sem autenticação'
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Obter todos os logs de autenticação
 *     description: Lista todos os logs de tentativas de login e ações de autenticação
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [success, failed, pending]
 *         description: Filtrar por status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Número máximo de logs
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 logs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AuthLog'
 *                 total:
 *                   type: integer
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (apenas admins)
 */
// TEMPORÁRIO: Sem middlewares para debug
router.get('/', async (req, res) => {
  console.log('🔍 GET /api/logs chamado');
  try {
    const { status, limit = 100 } = req.query;
    
    const filters = {};
    if (status) {
      filters.status = status;
    }

    const logs = await AuthLog.find(filters, { limit: parseInt(limit) });

    console.log(`✅ Retornando ${logs.length} logs`);
    res.json({
      success: true,
      logs: logs,
      total: logs.length
    });
  } catch (error) {
    console.error('❌ Error fetching logs:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar logs' 
    });
  }
});

/**
 * @swagger
 * /api/auth/logs/stats:
 *   get:
 *     summary: Obter estatísticas dos logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas dos logs
 */
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const totalLogs = await AuthLog.count();
    const successLogs = await AuthLog.count({ status: 'success' });
    const failedLogs = await AuthLog.count({ status: 'failed' });
    
    // Logs das últimas 24 horas
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const allLogs = await AuthLog.find();
    const recentLogs = allLogs.filter(log => new Date(log.created_at) >= last24h).length;

    res.json({
      success: true,
      stats: {
        total: totalLogs,
        success: successLogs,
        failed: failedLogs,
        last24h: recentLogs
      }
    });
  } catch (error) {
    console.error('Error fetching log stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar estatísticas' 
    });
  }
});

/**
 * @swagger
 * /api/auth/logs/user/{userId}:
 *   get:
 *     summary: Obter logs de um usuário específico
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs do usuário
 */
router.get('/user/:userId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const logs = await AuthLog.find({ user_id: parseInt(userId) }, { limit: 50 });

    res.json({
      success: true,
      logs: logs,
      total: logs.length
    });
  } catch (error) {
    console.error('Error fetching user logs:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar logs do usuário' 
    });
  }
});

/**
 * @swagger
 * /api/auth/logs/{id}:
 *   delete:
 *     summary: Deletar um log específico
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log deletado com sucesso
 */
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await AuthLog.deleteById(parseInt(id));

    res.json({
      success: true,
      message: 'Log deletado com sucesso'
    });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao deletar log' 
    });
  }
});

/**
 * @swagger
 * /api/auth/logs/cleanup:
 *   delete:
 *     summary: Limpar logs antigos (mais de 90 dias)
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logs limpos com sucesso
 */
router.delete('/cleanup/old', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await AuthLog.deleteOld(90);

    res.json({
      success: true,
      message: `Logs antigos foram deletados com sucesso`,
      deletedCount: result ? result.length : 0
    });
  } catch (error) {
    console.error('Error cleaning up logs:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao limpar logs' 
    });
  }
});

module.exports = router;
