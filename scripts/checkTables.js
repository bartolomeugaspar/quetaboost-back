require('dotenv').config();
const supabase = require('../config/supabase');

async function checkTables() {
  console.log('🔍 Verificando tabelas no Supabase...\n');

  try {
    // Consulta para listar todas as tabelas
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');

    if (error) {
      console.error('❌ Erro ao buscar tabelas:', error.message);
      
      // Tentar método alternativo - verificar tabelas conhecidas
      console.log('\n📋 Tentando verificar tabelas conhecidas...\n');
      
      const knownTables = ['users', 'posts', 'contacts', 'auth_logs'];
      
      for (const tableName of knownTables) {
        try {
          const { data, error: tableError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          if (tableError) {
            console.log(`❌ ${tableName}: NÃO EXISTE`);
          } else {
            console.log(`✅ ${tableName}: EXISTE`);
          }
        } catch (err) {
          console.log(`❌ ${tableName}: NÃO EXISTE`);
        }
      }
      return;
    }

    if (!tables || tables.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada no schema public');
      return;
    }

    console.log(`✅ Encontradas ${tables.length} tabelas:\n`);
    
    for (const table of tables) {
      console.log(`📊 ${table.table_name}`);
      
      // Tentar contar registros
      try {
        const { count, error: countError } = await supabase
          .from(table.table_name)
          .select('*', { count: 'exact', head: true });
        
        if (!countError) {
          console.log(`   └─ ${count} registros`);
        }
      } catch (err) {
        console.log(`   └─ Não foi possível contar registros`);
      }
    }

    // Verificar especificamente a tabela auth_logs
    console.log('\n🔐 Verificando tabela auth_logs especificamente...');
    
    const { data: authLogs, error: authError } = await supabase
      .from('auth_logs')
      .select('*')
      .limit(5);
    
    if (authError) {
      console.log('❌ Tabela auth_logs NÃO EXISTE ou não tem permissões');
      console.log('   Erro:', authError.message);
      console.log('\n💡 Você precisa criar a tabela executando o SQL:');
      console.log('   migrations/create_auth_logs_table.sql\n');
    } else {
      console.log('✅ Tabela auth_logs EXISTE');
      console.log(`   Total de logs: ${authLogs.length}`);
      if (authLogs.length > 0) {
        console.log('\n📝 Últimos logs:');
        authLogs.forEach(log => {
          console.log(`   - ${log.user_email} | ${log.action} | ${log.status} | ${new Date(log.created_at).toLocaleString()}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }

  console.log('\n✅ Verificação concluída!');
  process.exit(0);
}

checkTables();
