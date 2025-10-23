require('dotenv').config();
const supabase = require('../config/supabase');

async function checkLogs() {
  console.log('🔍 Verificando logs de autenticação...\n');

  try {
    // Buscar todos os logs
    const { data: logs, error, count } = await supabase
      .from('auth_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ Erro ao buscar logs:', error.message);
      return;
    }

    console.log(`📊 Total de logs: ${count || 0}\n`);

    if (!logs || logs.length === 0) {
      console.log('⚠️  Nenhum log encontrado');
      console.log('\n💡 Isso significa que:');
      console.log('   1. A tabela existe mas está vazia');
      console.log('   2. Nenhum login foi registrado ainda');
      console.log('   3. Faça um login no sistema para criar o primeiro log\n');
      return;
    }

    console.log('📝 Últimos 10 logs:\n');
    console.log('─'.repeat(100));
    console.log('ID  | Email                    | Ação          | Status  | IP            | Data/Hora');
    console.log('─'.repeat(100));

    logs.forEach(log => {
      const date = new Date(log.created_at).toLocaleString('pt-PT');
      const email = (log.user_email || '').padEnd(24);
      const action = (log.action || '').padEnd(13);
      const status = (log.status || '').padEnd(7);
      const ip = (log.ip_address || 'N/A').padEnd(13);
      
      console.log(`${String(log.id).padEnd(3)} | ${email} | ${action} | ${status} | ${ip} | ${date}`);
    });

    console.log('─'.repeat(100));

    // Estatísticas
    const successCount = logs.filter(l => l.status === 'success').length;
    const failedCount = logs.filter(l => l.status === 'failed').length;

    console.log('\n📈 Estatísticas dos últimos 10 logs:');
    console.log(`   ✅ Sucesso: ${successCount}`);
    console.log(`   ❌ Falhou: ${failedCount}`);

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }

  console.log('\n✅ Verificação concluída!');
  process.exit(0);
}

checkLogs();
