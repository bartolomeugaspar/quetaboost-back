const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Login para obter token
async function login() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@quetaboost.com',
      password: 'admin123'
    });
    return response.data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    throw error;
  }
}

// Posts com imagens reais do Unsplash
const posts = [
  {
    title: 'Como Criar uma Estratégia de Marketing Digital Vencedora',
    excerpt: 'Aprenda a desenvolver uma estratégia completa de marketing digital que gera resultados reais para o seu negócio.',
    content: `<h2>O Poder do Marketing Digital</h2>
    <p>No mundo digital de hoje, ter uma estratégia bem definida é essencial para o sucesso. Neste guia, vamos explorar os pilares fundamentais de uma estratégia vencedora.</p>
    
    <h2>1. Defina Seus Objetivos</h2>
    <p>Antes de começar, é crucial definir objetivos SMART: Específicos, Mensuráveis, Atingíveis, Relevantes e Temporais.</p>
    
    <h2>2. Conheça Seu Público</h2>
    <p>Entender profundamente quem é seu público-alvo é a chave para criar campanhas efetivas.</p>
    
    <h2>3. Escolha os Canais Certos</h2>
    <p>Nem todos os canais são adequados para todos os negócios. Foque onde seu público está.</p>
    
    <h2>4. Crie Conteúdo de Valor</h2>
    <p>Conteúdo relevante e de qualidade é o que atrai e mantém sua audiência engajada.</p>
    
    <h2>5. Mensure e Otimize</h2>
    <p>Use analytics para entender o que funciona e ajuste sua estratégia continuamente.</p>`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    category: 'Marketing Digital',
    tags: 'marketing digital, estratégia, negócios, ROI',
    status: 'published'
  },
  {
    title: 'SEO em 2025: Guia Completo para Ranquear no Google',
    excerpt: 'Descubra as técnicas mais atualizadas de SEO para posicionar seu site no topo dos resultados de busca.',
    content: `<h2>SEO Nunca Foi Tão Importante</h2>
    <p>Com bilhões de buscas diárias no Google, estar bem posicionado pode transformar seu negócio.</p>
    
    <h2>Otimização On-Page</h2>
    <p>Title tags, meta descriptions, headings e conteúdo de qualidade são fundamentais.</p>
    
    <h2>Link Building</h2>
    <p>Backlinks de qualidade continuam sendo um dos principais fatores de ranqueamento.</p>
    
    <h2>Experiência do Usuário</h2>
    <p>Core Web Vitals e mobile-first são prioridades do Google em 2025.</p>
    
    <h2>Conteúdo E-E-A-T</h2>
    <p>Experiência, Expertise, Autoridade e Confiabilidade são essenciais para ranquear.</p>`,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&fit=crop',
    category: 'SEO',
    tags: 'SEO, Google, ranqueamento, otimização, busca orgânica',
    status: 'published'
  },
  {
    title: 'Redes Sociais para Negócios: Qual Escolher em 2025?',
    excerpt: 'Análise completa das principais plataformas sociais e como escolher a melhor para seu negócio.',
    content: `<h2>O Cenário das Redes Sociais</h2>
    <p>Cada plataforma tem suas particularidades e públicos específicos. Vamos analisar as principais.</p>
    
    <h2>Instagram</h2>
    <p>Ideal para marcas visuais, produtos e serviços B2C. Reels e Stories são essenciais.</p>
    
    <h2>LinkedIn</h2>
    <p>A rede profissional por excelência. Perfeita para B2B e networking.</p>
    
    <h2>TikTok</h2>
    <p>Crescimento explosivo. Ótimo para alcançar público jovem com conteúdo criativo.</p>
    
    <h2>Facebook</h2>
    <p>Ainda relevante para públicos mais maduros e grupos de comunidade.</p>
    
    <h2>Como Escolher</h2>
    <p>Analise onde seu público está, seus objetivos e recursos disponíveis.</p>`,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop',
    category: 'Redes Sociais',
    tags: 'redes sociais, Instagram, LinkedIn, TikTok, estratégia social',
    status: 'published'
  },
  {
    title: 'Email Marketing: Como Criar Campanhas que Convertem',
    excerpt: 'Técnicas comprovadas para aumentar suas taxas de abertura, cliques e conversões em email marketing.',
    content: `<h2>Email Marketing Ainda Funciona?</h2>
    <p>Sim! Com ROI de 42:1, email marketing continua sendo um dos canais mais lucrativos.</p>
    
    <h2>Construa uma Lista de Qualidade</h2>
    <p>Foque em qualidade, não quantidade. Leads engajados valem mais que números grandes.</p>
    
    <h2>Assuntos Irresistíveis</h2>
    <p>Seu assunto determina se o email será aberto. Use curiosidade, urgência e personalização.</p>
    
    <h2>Segmentação é Chave</h2>
    <p>Emails segmentados têm taxas de abertura 14% maiores e cliques 100% maiores.</p>
    
    <h2>Automação Inteligente</h2>
    <p>Configure fluxos automáticos para nutrir leads e aumentar conversões.</p>`,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop',
    category: 'Email Marketing',
    tags: 'email marketing, conversão, automação, newsletter, campanhas',
    status: 'published'
  },
  {
    title: 'Inteligência Artificial no Marketing: Guia Prático',
    excerpt: 'Como usar IA para automatizar tarefas, personalizar experiências e aumentar resultados no marketing.',
    content: `<h2>A Revolução da IA no Marketing</h2>
    <p>IA não é mais futuro, é presente. Empresas que não adotam ficam para trás.</p>
    
    <h2>ChatGPT para Conteúdo</h2>
    <p>Use IA para brainstorming, rascunhos e otimização de textos, mas sempre revise.</p>
    
    <h2>Personalização em Escala</h2>
    <p>IA permite personalizar experiências para milhares de usuários simultaneamente.</p>
    
    <h2>Análise Preditiva</h2>
    <p>Preveja comportamentos, identifique tendências e tome decisões baseadas em dados.</p>
    
    <h2>Chatbots Inteligentes</h2>
    <p>Atendimento 24/7 com respostas cada vez mais naturais e úteis.</p>`,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    category: 'Tecnologia',
    tags: 'inteligência artificial, IA, ChatGPT, automação, tecnologia',
    status: 'published'
  },
  {
    title: 'Google Ads: Como Criar Campanhas Lucrativas',
    excerpt: 'Passo a passo completo para criar, otimizar e escalar campanhas de Google Ads com ROI positivo.',
    content: `<h2>O Poder do Google Ads</h2>
    <p>Com bilhões de buscas diárias, Google Ads permite alcançar pessoas no momento exato da intenção de compra.</p>
    
    <h2>Pesquisa de Palavras-Chave</h2>
    <p>Use ferramentas como Keyword Planner para encontrar termos com bom volume e baixa concorrência.</p>
    
    <h2>Estrutura de Campanhas</h2>
    <p>Organize campanhas por temas, grupos de anúncios específicos e palavras-chave relevantes.</p>
    
    <h2>Anúncios Persuasivos</h2>
    <p>Títulos chamativos, descrições claras e CTAs fortes aumentam o CTR.</p>
    
    <h2>Landing Pages Otimizadas</h2>
    <p>A página de destino deve ser relevante, rápida e focada em conversão.</p>
    
    <h2>Teste e Otimize</h2>
    <p>A/B testing constante é essencial para melhorar resultados continuamente.</p>`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    category: 'Tráfego Pago',
    tags: 'Google Ads, PPC, tráfego pago, anúncios, ROI',
    status: 'published'
  },
  {
    title: 'Content Marketing: Como Criar Conteúdo que Engaja',
    excerpt: 'Estratégias práticas para criar conteúdo relevante que atrai, engaja e converte sua audiência.',
    content: `<h2>Conteúdo é Rei</h2>
    <p>No marketing digital, conteúdo de qualidade é o que diferencia marcas medianas de líderes.</p>
    
    <h2>Entenda Sua Audiência</h2>
    <p>Crie personas detalhadas e entenda suas dores, desejos e jornada de compra.</p>
    
    <h2>Formatos Diversos</h2>
    <p>Blog posts, vídeos, podcasts, infográficos - diversifique para alcançar mais pessoas.</p>
    
    <h2>SEO e Conteúdo</h2>
    <p>Otimize para buscadores sem sacrificar a qualidade para humanos.</p>
    
    <h2>Storytelling</h2>
    <p>Histórias conectam emocionalmente e são mais memoráveis que dados puros.</p>
    
    <h2>Distribuição Estratégica</h2>
    <p>Criar é só metade do trabalho. Distribua em múltiplos canais.</p>`,
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1200&h=630&fit=crop',
    category: 'Marketing de Conteúdo',
    tags: 'content marketing, conteúdo, storytelling, engajamento, blog',
    status: 'published'
  },
  {
    title: 'Analytics e Métricas: O Que Realmente Importa',
    excerpt: 'Aprenda a identificar e acompanhar as métricas que realmente impactam o crescimento do seu negócio.',
    content: `<h2>Dados São o Novo Petróleo</h2>
    <p>Mas só se você souber extrair insights valiosos deles.</p>
    
    <h2>Métricas de Vaidade vs Métricas Acionáveis</h2>
    <p>Curtidas são legais, mas conversões pagam as contas. Foque no que importa.</p>
    
    <h2>Google Analytics 4</h2>
    <p>A nova versão traz foco em eventos e jornada do usuário. Aprenda a usar.</p>
    
    <h2>KPIs Essenciais</h2>
    <p>CAC, LTV, taxa de conversão, ROI - entenda e monitore constantemente.</p>
    
    <h2>Dashboards Eficientes</h2>
    <p>Crie dashboards que mostram o que você precisa de forma clara e acionável.</p>
    
    <h2>Cultura Data-Driven</h2>
    <p>Decisões baseadas em dados, não em achismos, levam a melhores resultados.</p>`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    category: 'Analytics',
    tags: 'analytics, métricas, dados, KPI, Google Analytics',
    status: 'published'
  },
  {
    title: 'Branding Digital: Construa uma Marca Forte Online',
    excerpt: 'Como desenvolver uma identidade de marca consistente e memorável no ambiente digital.',
    content: `<h2>Sua Marca no Digital</h2>
    <p>No mundo online, sua marca é sua maior diferenciação competitiva.</p>
    
    <h2>Identidade Visual Consistente</h2>
    <p>Logo, cores, tipografia - mantenha consistência em todos os pontos de contato.</p>
    
    <h2>Tom de Voz</h2>
    <p>Defina como sua marca se comunica. Formal? Descontraído? Técnico?</p>
    
    <h2>Valores e Propósito</h2>
    <p>Marcas com propósito claro criam conexões mais profundas com clientes.</p>
    
    <h2>Experiência do Cliente</h2>
    <p>Cada interação reforça ou enfraquece sua marca. Cuide de todos os detalhes.</p>
    
    <h2>Reputação Online</h2>
    <p>Monitore menções, responda feedbacks e construa autoridade no seu nicho.</p>`,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop',
    category: 'Branding',
    tags: 'branding, marca, identidade visual, reputação, posicionamento',
    status: 'published'
  },
  {
    title: 'Funil de Vendas Digital: Da Atração à Conversão',
    excerpt: 'Construa um funil de vendas eficiente que transforma visitantes em clientes fiéis.',
    content: `<h2>O Funil de Vendas Moderno</h2>
    <p>Entender a jornada do cliente é essencial para otimizar cada etapa.</p>
    
    <h2>Topo do Funil: Atração</h2>
    <p>Conteúdo educativo, SEO e redes sociais para gerar awareness.</p>
    
    <h2>Meio do Funil: Consideração</h2>
    <p>Webinars, ebooks e cases para nutrir leads e gerar confiança.</p>
    
    <h2>Fundo do Funil: Conversão</h2>
    <p>Demos, trials e ofertas específicas para fechar vendas.</p>
    
    <h2>Pós-Venda: Fidelização</h2>
    <p>Onboarding, suporte e upsell para maximizar LTV.</p>
    
    <h2>Automação do Funil</h2>
    <p>Use ferramentas para automatizar e escalar seu processo de vendas.</p>`,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=630&fit=crop',
    category: 'Vendas',
    tags: 'funil de vendas, conversão, vendas, jornada do cliente, CRM',
    status: 'published'
  }
];

// Criar posts
async function createPosts(token) {
  console.log('🚀 Iniciando criação de posts...\n');
  
  for (let i = 0; i < posts.length; i++) {
    try {
      const response = await axios.post(
        `${API_URL}/posts`,
        posts[i],
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`✅ Post ${i + 1}/10 criado: "${posts[i].title}"`);
    } catch (error) {
      console.error(`❌ Erro ao criar post ${i + 1}:`, error.response?.data || error.message);
    }
  }
  
  console.log('\n🎉 Processo concluído!');
}

// Executar
async function main() {
  try {
    console.log('🔐 Fazendo login...');
    const token = await login();
    console.log('✅ Login realizado com sucesso!\n');
    
    await createPosts(token);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
