-- Adicionar colunas para reset de senha na tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP WITH TIME ZONE;

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

-- Comentários
COMMENT ON COLUMN users.reset_token IS 'Token hash para reset de senha';
COMMENT ON COLUMN users.reset_token_expiry IS 'Data de expiração do token de reset';
