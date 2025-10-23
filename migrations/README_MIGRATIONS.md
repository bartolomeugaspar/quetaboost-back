# Migrações do Banco de Dados - Queta Boost

## 📋 Como Aplicar as Migrações no Supabase

### Opção 1: Via Dashboard do Supabase (Recomendado)

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto **Queta Boost**
3. No menu lateral, clique em **SQL Editor**
4. Clique em **New Query**
5. Copie e cole o conteúdo do arquivo `create_auth_logs_table.sql`
6. Clique em **Run** ou pressione `Ctrl+Enter`
7. Verifique se apareceu a mensagem de sucesso

### Opção 2: Via CLI do Supabase

```bash
# Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# Login no Supabase
supabase login

# Aplicar a migração
supabase db push --db-url "sua-connection-string"
```

### Opção 3: Via psql (PostgreSQL Client)

```bash
# Conectar ao banco
psql "postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"

# Executar o arquivo
\i migrations/create_auth_logs_table.sql
```

## ✅ Verificar se a Tabela Foi Criada

Execute no SQL Editor do Supabase:

```sql
-- Verificar se a tabela existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'auth_logs';

-- Ver estrutura da tabela
\d auth_logs

-- Ou via query SQL
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'auth_logs'
ORDER BY ordinal_position;
```

## 📊 Estrutura da Tabela `auth_logs`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | SERIAL | ID único (auto-incremento) |
| `user_id` | INTEGER | Referência ao usuário (pode ser NULL) |
| `user_email` | VARCHAR(255) | Email usado no login |
| `user_name` | VARCHAR(255) | Nome do usuário |
| `action` | VARCHAR(50) | Tipo de ação (login, logout, etc) |
| `status` | VARCHAR(50) | Status (success, failed, pending) |
| `ip_address` | VARCHAR(100) | IP de origem |
| `user_agent` | TEXT | Navegador/cliente |
| `error_message` | TEXT | Mensagem de erro (se houver) |
| `created_at` | TIMESTAMP | Data/hora do log |

## 🔍 Índices Criados

- `idx_auth_logs_user_email` - Para buscar por email
- `idx_auth_logs_status` - Para filtrar por status
- `idx_auth_logs_created_at` - Para ordenar por data
- `idx_auth_logs_user_id` - Para buscar logs de um usuário
- `idx_auth_logs_action` - Para filtrar por tipo de ação

## 🧹 Limpeza Automática (Opcional)

A migração inclui uma função `cleanup_old_auth_logs()` que deleta logs com mais de 90 dias.

Para executar manualmente:
```sql
SELECT cleanup_old_auth_logs();
```

Para agendar execução automática (requer extensão pg_cron):
```sql
-- Habilitar extensão
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Agendar limpeza toda semana (domingo às 2h)
SELECT cron.schedule(
  'cleanup-auth-logs',
  '0 2 * * 0',
  'SELECT cleanup_old_auth_logs();'
);
```

## 🔐 Permissões (RLS - Row Level Security)

Se você usa RLS no Supabase, adicione as políticas:

```sql
-- Habilitar RLS
ALTER TABLE auth_logs ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem ver logs
CREATE POLICY "Admins can view all logs"
  ON auth_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Apenas admins podem deletar logs
CREATE POLICY "Admins can delete logs"
  ON auth_logs
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

## 📝 Testar a Integração

Após criar a tabela, faça um login no sistema e verifique:

```sql
-- Ver últimos logs
SELECT * FROM auth_logs 
ORDER BY created_at DESC 
LIMIT 10;

-- Contar logs por status
SELECT status, COUNT(*) 
FROM auth_logs 
GROUP BY status;

-- Ver tentativas falhadas
SELECT user_email, error_message, created_at
FROM auth_logs
WHERE status = 'failed'
ORDER BY created_at DESC;
```

## ⚠️ Importante

- **Backup**: Sempre faça backup antes de executar migrações
- **Ambiente**: Teste primeiro em desenvolvimento
- **Logs**: Os logs começarão a ser criados automaticamente após a migração
- **Performance**: Os índices garantem consultas rápidas mesmo com muitos logs

## 🆘 Problemas Comuns

### Erro: "relation users does not exist"
- Certifique-se que a tabela `users` existe primeiro
- Verifique o nome correto da tabela de usuários

### Erro: "permission denied"
- Verifique se você tem permissões de admin no Supabase
- Use a connection string correta com credenciais de admin

### Logs não aparecem
- Verifique se o backend está conectado ao Supabase correto
- Confirme que a variável `DATABASE_URL` está configurada
- Teste fazer um login e verifique os logs do servidor
