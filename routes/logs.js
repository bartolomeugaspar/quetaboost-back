const express = require('express');
const router = express.Router();
const AuthLog = require('../models/AuthLog');
const { authenticateToken, isAdmin } = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/logs:
 *   get:
 *     summary: Obter todos os logs de autenticação
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
 *         description: Lista de logs
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status, limit = 100 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const logs = await AuthLog.find(query)
      .sort({ created_at: -1 })
      .limit(parseInt(limit))
      .populate('user_id', 'name email');

    // Formatar logs para incluir informações do usuário
    const formattedLogs = logs.map(log => ({
      id: log._id,
      user_id: log.user_id?._id,
      user_email: log.user_email,
      user_name: log.user_name || log.user_id?.name,
      action: log.action,
      status: log.status,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      error_message: log.error_message,
      created_at: log.created_at
    }));

    res.json({
      success: true,
      logs: formattedLogs,
      total: formattedLogs.length
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
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
    const totalLogs = await AuthLog.countDocuments();
    const successLogs = await AuthLog.countDocuments({ status: 'success' });
    const failedLogs = await AuthLog.countDocuments({ status: 'failed' });
    
    // Logs das últimas 24 horas
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = await AuthLog.countDocuments({ 
      created_at: { $gte: last24h } 
    });

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
    
    const logs = await AuthLog.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(50);

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
    
    await AuthLog.findByIdAndDelete(id);

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
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    
    const result = await AuthLog.deleteMany({ 
      created_at: { $lt: ninetyDaysAgo } 
    });

    res.json({
      success: true,
      message: `${result.deletedCount} logs antigos foram deletados`,
      deletedCount: result.deletedCount
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
