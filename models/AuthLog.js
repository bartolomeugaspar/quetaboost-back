const supabase = require('../config/supabase');

/**
 * Modelo AuthLog para Supabase (PostgreSQL)
 * Tabela: auth_logs
 */

const AuthLog = {
  tableName: 'auth_logs',

  /**
   * Criar novo log
   */
  async create(data) {
    const { data: log, error } = await supabase
      .from(this.tableName)
      .insert([{
        user_id: data.user_id || null,
        user_email: data.user_email,
        user_name: data.user_name || null,
        action: data.action || 'login',
        status: data.status || 'success',
        ip_address: data.ip_address || null,
        user_agent: data.user_agent || null,
        error_message: data.error_message || null
      }])
      .select()
      .single();

    if (error) throw error;
    return log;
  },

  /**
   * Buscar todos os logs com filtros
   */
  async find(filters = {}, options = {}) {
    let query = supabase
      .from(this.tableName)
      .select('*');

    // Aplicar filtros
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id);
    }
    if (filters.user_email) {
      query = query.eq('user_email', filters.user_email);
    }
    if (filters.action) {
      query = query.eq('action', filters.action);
    }

    // Ordenar
    query = query.order('created_at', { ascending: false });

    // Limitar resultados
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Buscar log por ID
   */
  async findById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Contar logs
   */
  async count(filters = {}) {
    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  },

  /**
   * Deletar log por ID
   */
  async deleteById(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * Deletar logs antigos (mais de X dias)
   */
  async deleteOld(days = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { data, error } = await supabase
      .from(this.tableName)
      .delete()
      .lt('created_at', cutoffDate.toISOString());

    if (error) throw error;
    return data;
  }
};

module.exports = AuthLog;
