-- Criar tabela de logs de autenticação
CREATE TABLE IF NOT EXISTS auth_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255),
  action VARCHAR(50) NOT NULL DEFAULT 'login',
  status VARCHAR(50) NOT NULL DEFAULT 'success',
  ip_address VARCHAR(100),
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar constraints para validar os valores
ALTER TABLE auth_logs 
  ADD CONSTRAINT check_action 
  CHECK (action IN ('login', 'logout', 'failed_login', 'password_reset'));

ALTER TABLE auth_logs 
  ADD CONSTRAINT check_status 
  CHECK (status IN ('success', 'failed', 'pending'));

-- Criar índices para melhor performance
CREATE INDEX idx_auth_logs_user_email ON auth_logs(user_email);
CREATE INDEX idx_auth_logs_status ON auth_logs(status);
CREATE INDEX idx_auth_logs_created_at ON auth_logs(created_at DESC);
CREATE INDEX idx_auth_logs_user_id ON auth_logs(user_id);
CREATE INDEX idx_auth_logs_action ON auth_logs(action);

-- Comentários para documentação
COMMENT ON TABLE auth_logs IS 'Tabela para armazenar logs de autenticação e atividades de usuários';
COMMENT ON COLUMN auth_logs.user_id IS 'ID do usuário (pode ser NULL se usuário não existir)';
COMMENT ON COLUMN auth_logs.user_email IS 'Email usado na tentativa de login';
COMMENT ON COLUMN auth_logs.action IS 'Tipo de ação: login, logout, failed_login, password_reset';
COMMENT ON COLUMN auth_logs.status IS 'Status da ação: success, failed, pending';
COMMENT ON COLUMN auth_logs.ip_address IS 'Endereço IP de onde veio a requisição';
COMMENT ON COLUMN auth_logs.user_agent IS 'User agent do navegador/cliente';
COMMENT ON COLUMN auth_logs.error_message IS 'Mensagem de erro (se houver)';

-- Função para limpar logs antigos automaticamente (opcional)
CREATE OR REPLACE FUNCTION cleanup_old_auth_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM auth_logs 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Criar um job agendado para limpar logs antigos (opcional - requer pg_cron)
-- SELECT cron.schedule('cleanup-auth-logs', '0 2 * * 0', 'SELECT cleanup_old_auth_logs();');
