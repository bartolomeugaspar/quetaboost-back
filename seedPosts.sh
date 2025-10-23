#!/bin/bash

# Fazer login e obter token
echo "🔐 Fazendo login..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@quetaboost.com","password":"admin123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Erro ao fazer login"
  exit 1
fi

echo "✅ Login realizado com sucesso!"
echo ""
echo "🚀 Criando 10 posts..."
echo ""

# Post 1
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Como Criar uma Estratégia de Marketing Digital Vencedora",
    "excerpt": "Aprenda a desenvolver uma estratégia completa de marketing digital que gera resultados reais para o seu negócio.",
    "content": "<h2>O Poder do Marketing Digital</h2><p>No mundo digital de hoje, ter uma estratégia bem definida é essencial para o sucesso. Neste guia, vamos explorar os pilares fundamentais de uma estratégia vencedora.</p><h2>1. Defina Seus Objetivos</h2><p>Antes de começar, é crucial definir objetivos SMART: Específicos, Mensuráveis, Atingíveis, Relevantes e Temporais.</p><h2>2. Conheça Seu Público</h2><p>Entender profundamente quem é seu público-alvo é a chave para criar campanhas efetivas.</p>",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
    "category": "Marketing Digital",
    "tags": "marketing digital, estratégia, negócios, ROI",
    "status": "published"
  }' > /dev/null && echo "✅ Post 1/10 criado"

# Post 2
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "SEO em 2025: Guia Completo para Ranquear no Google",
    "excerpt": "Descubra as técnicas mais atualizadas de SEO para posicionar seu site no topo dos resultados de busca.",
    "content": "<h2>SEO Nunca Foi Tão Importante</h2><p>Com bilhões de buscas diárias no Google, estar bem posicionado pode transformar seu negócio.</p><h2>Otimização On-Page</h2><p>Title tags, meta descriptions, headings e conteúdo de qualidade são fundamentais.</p><h2>Link Building</h2><p>Backlinks de qualidade continuam sendo um dos principais fatores de ranqueamento.</p>",
    "image": "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&fit=crop",
    "category": "SEO",
    "tags": "SEO, Google, ranqueamento, otimização, busca orgânica",
    "status": "published"
  }' > /dev/null && echo "✅ Post 2/10 criado"

# Post 3
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Redes Sociais para Negócios: Qual Escolher em 2025?",
    "excerpt": "Análise completa das principais plataformas sociais e como escolher a melhor para seu negócio.",
    "content": "<h2>O Cenário das Redes Sociais</h2><p>Cada plataforma tem suas particularidades e públicos específicos. Vamos analisar as principais.</p><h2>Instagram</h2><p>Ideal para marcas visuais, produtos e serviços B2C. Reels e Stories são essenciais.</p><h2>LinkedIn</h2><p>A rede profissional por excelência. Perfeita para B2B e networking.</p>",
    "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop",
    "category": "Redes Sociais",
    "tags": "redes sociais, Instagram, LinkedIn, TikTok, estratégia social",
    "status": "published"
  }' > /dev/null && echo "✅ Post 3/10 criado"

# Post 4
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Email Marketing: Como Criar Campanhas que Convertem",
    "excerpt": "Técnicas comprovadas para aumentar suas taxas de abertura, cliques e conversões em email marketing.",
    "content": "<h2>Email Marketing Ainda Funciona?</h2><p>Sim! Com ROI de 42:1, email marketing continua sendo um dos canais mais lucrativos.</p><h2>Construa uma Lista de Qualidade</h2><p>Foque em qualidade, não quantidade. Leads engajados valem mais que números grandes.</p><h2>Assuntos Irresistíveis</h2><p>Seu assunto determina se o email será aberto. Use curiosidade, urgência e personalização.</p>",
    "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop",
    "category": "Email Marketing",
    "tags": "email marketing, conversão, automação, newsletter, campanhas",
    "status": "published"
  }' > /dev/null && echo "✅ Post 4/10 criado"

# Post 5
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inteligência Artificial no Marketing: Guia Prático",
    "excerpt": "Como usar IA para automatizar tarefas, personalizar experiências e aumentar resultados no marketing.",
    "content": "<h2>A Revolução da IA no Marketing</h2><p>IA não é mais futuro, é presente. Empresas que não adotam ficam para trás.</p><h2>ChatGPT para Conteúdo</h2><p>Use IA para brainstorming, rascunhos e otimização de textos, mas sempre revise.</p><h2>Personalização em Escala</h2><p>IA permite personalizar experiências para milhares de usuários simultaneamente.</p>",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    "category": "Tecnologia",
    "tags": "inteligência artificial, IA, ChatGPT, automação, tecnologia",
    "status": "published"
  }' > /dev/null && echo "✅ Post 5/10 criado"

# Post 6
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Google Ads: Como Criar Campanhas Lucrativas",
    "excerpt": "Passo a passo completo para criar, otimizar e escalar campanhas de Google Ads com ROI positivo.",
    "content": "<h2>O Poder do Google Ads</h2><p>Com bilhões de buscas diárias, Google Ads permite alcançar pessoas no momento exato da intenção de compra.</p><h2>Pesquisa de Palavras-Chave</h2><p>Use ferramentas como Keyword Planner para encontrar termos com bom volume e baixa concorrência.</p><h2>Estrutura de Campanhas</h2><p>Organize campanhas por temas, grupos de anúncios específicos e palavras-chave relevantes.</p>",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    "category": "Tráfego Pago",
    "tags": "Google Ads, PPC, tráfego pago, anúncios, ROI",
    "status": "published"
  }' > /dev/null && echo "✅ Post 6/10 criado"

# Post 7
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Content Marketing: Como Criar Conteúdo que Engaja",
    "excerpt": "Estratégias práticas para criar conteúdo relevante que atrai, engaja e converte sua audiência.",
    "content": "<h2>Conteúdo é Rei</h2><p>No marketing digital, conteúdo de qualidade é o que diferencia marcas medianas de líderes.</p><h2>Entenda Sua Audiência</h2><p>Crie personas detalhadas e entenda suas dores, desejos e jornada de compra.</p><h2>Formatos Diversos</h2><p>Blog posts, vídeos, podcasts, infográficos - diversifique para alcançar mais pessoas.</p>",
    "image": "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1200&h=630&fit=crop",
    "category": "Marketing de Conteúdo",
    "tags": "content marketing, conteúdo, storytelling, engajamento, blog",
    "status": "published"
  }' > /dev/null && echo "✅ Post 7/10 criado"

# Post 8
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Analytics e Métricas: O Que Realmente Importa",
    "excerpt": "Aprenda a identificar e acompanhar as métricas que realmente impactam o crescimento do seu negócio.",
    "content": "<h2>Dados São o Novo Petróleo</h2><p>Mas só se você souber extrair insights valiosos deles.</p><h2>Métricas de Vaidade vs Métricas Acionáveis</h2><p>Curtidas são legais, mas conversões pagam as contas. Foque no que importa.</p><h2>Google Analytics 4</h2><p>A nova versão traz foco em eventos e jornada do usuário. Aprenda a usar.</p>",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    "category": "Analytics",
    "tags": "analytics, métricas, dados, KPI, Google Analytics",
    "status": "published"
  }' > /dev/null && echo "✅ Post 8/10 criado"

# Post 9
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Branding Digital: Construa uma Marca Forte Online",
    "excerpt": "Como desenvolver uma identidade de marca consistente e memorável no ambiente digital.",
    "content": "<h2>Sua Marca no Digital</h2><p>No mundo online, sua marca é sua maior diferenciação competitiva.</p><h2>Identidade Visual Consistente</h2><p>Logo, cores, tipografia - mantenha consistência em todos os pontos de contato.</p><h2>Tom de Voz</h2><p>Defina como sua marca se comunica. Formal? Descontraído? Técnico?</p>",
    "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop",
    "category": "Branding",
    "tags": "branding, marca, identidade visual, reputação, posicionamento",
    "status": "published"
  }' > /dev/null && echo "✅ Post 9/10 criado"

# Post 10
curl -s -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Funil de Vendas Digital: Da Atração à Conversão",
    "excerpt": "Construa um funil de vendas eficiente que transforma visitantes em clientes fiéis.",
    "content": "<h2>O Funil de Vendas Moderno</h2><p>Entender a jornada do cliente é essencial para otimizar cada etapa.</p><h2>Topo do Funil: Atração</h2><p>Conteúdo educativo, SEO e redes sociais para gerar awareness.</p><h2>Meio do Funil: Consideração</h2><p>Webinars, ebooks e cases para nutrir leads e gerar confiança.</p>",
    "image": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=630&fit=crop",
    "category": "Vendas",
    "tags": "funil de vendas, conversão, vendas, jornada do cliente, CRM",
    "status": "published"
  }' > /dev/null && echo "✅ Post 10/10 criado"

echo ""
echo "🎉 10 posts criados com sucesso!"
echo "📸 Todas as imagens são do Unsplash (reais e de alta qualidade)"
