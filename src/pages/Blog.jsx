import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Search, Filter, Heart, BookOpen, ChefHat, Lightbulb, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [selectedPost, setSelectedPost] = useState(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  // Função para gerar posts com imagens dinâmicas
  const getBlogPosts = () => [
    {
      id: 1,
      title: 'Como Fazer o Bolo de Chocolate Perfeito',
      excerpt: 'Aprenda os segredos para fazer um bolo de chocolate macio, úmido e irresistível. Dicas profissionais da nossa confeitaria.',
      content: `Neste post, você vai aprender todas as técnicas para fazer o bolo de chocolate perfeito. Desde a escolha dos ingredientes até o ponto ideal do forno.

**📊 INFORMAÇÕES DA RECEITA:**
• Tempo total: 1h 30min (preparo: 20min + forno: 40min + resfriamento: 30min)
• Rendimento: 8-10 fatias
• Nível: Intermediário
• Dificuldade: ⭐⭐⭐☆☆

**🥄 INGREDIENTES:**
- 3 ovos grandes (temperatura ambiente)
- 1 xícara (200g) de açúcar cristal
- 1 xícara (240ml) de leite integral
- 1/2 xícara (120ml) de óleo de girassol
- 2 xícaras (240g) de farinha de trigo
- 1 xícara (100g) de chocolate em pó 50% cacau
- 1 colher de sopa (15g) de fermento químico
- 1 colher de chá de essência de baunilha
- 1 pitada de sal

**🔄 INGREDIENTES ALTERNATIVOS:**
• Açúcar: pode usar açúcar demerara ou mascavo
• Leite: substitua por leite de amêndoas ou aveia
• Óleo: use manteiga derretida para sabor mais intenso
• Farinha: farinha de amêndoas para versão sem glúten
• Chocolate: cacau em pó puro para versão mais amarga

**👨‍🍳 MODO DE PREPARO:**
1. **Pré-aqueça o forno** a 180°C e unte uma forma de 22cm
2. **Bata os ovos** com o açúcar até ficar cremoso e esbranquiçado (5min)
3. **Adicione o leite** e o óleo, misturando bem
4. **Peneire a farinha**, o chocolate, o fermento e o sal
5. **Misture delicadamente** com movimentos envolventes
6. **Adicione a baunilha** e misture suavemente
7. **Despeje na forma** e leve ao forno por 40-45 minutos
8. **Teste o ponto** com um palito - deve sair limpo
9. **Deixe esfriar** na forma por 10min, depois desenforme

**💡 DICAS PROFISSIONAIS:**
- Use ingredientes em temperatura ambiente
- Não bata demais a massa após adicionar a farinha
- Teste o ponto com um palito antes de tirar do forno
- Para um bolo mais úmido, adicione 1/4 xícara de iogurte natural
- Conserve em geladeira por até 3 dias

**🎯 RESULTADO ESPERADO:**
Um bolo macio, úmido, com sabor intenso de chocolate e textura perfeita para qualquer ocasião especial!`,
      category: 'receitas',
      categoryName: 'Receitas',
      author: 'Chef Maria Silva',
      date: new Date('2025-01-15'),
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      featured: true,
      tags: ['bolo', 'chocolate', 'receita', 'doces'],
      difficulty: 'Intermediário',
      totalTime: '1h 30min',
      servings: '8-10 fatias'
    },
    {
      id: 2,
      title: '5 Dicas para Decorar Cupcakes como um Profissional',
      excerpt: 'Transforme seus cupcakes em obras de arte com essas técnicas simples de decoração que qualquer um pode aprender.',
      content: `A decoração de cupcakes é uma arte que pode ser dominada com prática e as técnicas certas. Neste post, compartilhamos nossos segredos profissionais para criar cupcakes que impressionam!

**📊 INFORMAÇÕES DO POST:**
• Tempo de leitura: 6 minutos
• Nível: Iniciante a Intermediário
• Dificuldade: ⭐⭐☆☆☆
• Aplicável a: Todos os tipos de cupcakes

**🎨 DICA 1: ESCOLHA O BICO CERTO**

**Bicos Essenciais:**
• **Bico Redondo (#12):** Para bolinhas e contornos
• **Bico Estrela (#1M):** Para rosetas clássicas
• **Bico Folha (#352):** Para decorações naturais
• **Bico Pétala (#104):** Para flores elegantes

**💡 DICA 2: CONSISTÊNCIA DO GLACÊ**

**Ponto Perfeito:**
- Deve formar picos firmes quando levantado
- Não deve escorrer nem quebrar
- Textura cremosa e lisa
- Temperatura ambiente ideal

**Receita Básica:**
- 3 xícaras de açúcar de confeiteiro
- 1/3 xícara de manteiga
- 1 1/2 colher de chá de essência de baunilha
- 2-3 colheres de leite

**🎯 DICA 3: TÉCNICAS DE APLICAÇÃO**

**Movimento Circular:**
1. Comece do centro para fora
2. Mantenha pressão constante
3. Crie espirais uniformes
4. Termine com movimento suave

**Roseta Perfeita:**
- Aplique pressão e gire o cupcake
- Mantenha altura consistente
- Crie camadas sobrepostas
- Finalize com pico no centro

**🌟 DICA 4: CORES E SABORES**

**Paleta Harmoniosa:**
- Use 2-3 cores principais
- Adicione contrastes sutis
- Teste combinações antes
- Considere o sabor do cupcake

**Cores Profissionais:**
- **Rosa:** Morango, framboesa
- **Azul:** Blueberry, baunilha
- **Verde:** Matcha, pistache
- **Dourado:** Caramelo, canela

**✨ DICA 5: DECORAÇÕES ESPECIAIS**

**Elementos Premium:**
- **Frutas frescas:** Morangos, mirtilos
- **Chocolate derretido:** Gota, raspas
- **Confeitos coloridos:** Sprinkles, granulados
- **Flores comestíveis:** Pétalas, folhas

**Técnicas Avançadas:**
- **Ombré:** Gradiente de cores
- **Marbling:** Efeito mármore
- **Texturas:** Pinceladas, relevos
- **3D:** Elementos em camadas

**🛠️ FERRAMENTAS ESSENCIAIS:**
• Conjunto de bicos de confeitar
• Saco de confeitar reutilizável
• Espátula offset
• Rolo de açúcar
• Pincéis para detalhes
• Torneira para cupcakes

**💡 DICAS PROFISSIONAIS:**
- Pratique em papel antes de decorar
- Mantenha as mãos limpas e secas
- Use ingredientes em temperatura ambiente
- Decore logo após o resfriamento
- Armazene em local fresco e seco

**🎯 RESULTADO ESPERADO:**
Cupcakes com decoração profissional, visual atrativo e sabor inesquecível que vão impressionar qualquer convidado!`,
      category: 'dicas',
      categoryName: 'Dicas',
      author: 'Ana Costa',
      date: new Date('2025-01-12'),
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      featured: false,
      tags: ['cupcakes', 'decoração', 'dicas', 'técnicas'],
      difficulty: 'Iniciante',
      totalTime: '6 min',
      servings: 'Técnicas gerais'
    },
    {
      id: 3,
      title: 'Receita de Brigadeiro Gourmet com 3 Sabores',
      excerpt: 'Aprenda a fazer brigadeiros gourmet com sabores únicos: chocolate belga, morango e pistache. Receitas exclusivas!',
      content: `Os brigadeiros gourmet são a evolução do clássico brasileiro. Neste post, ensinamos três variações deliciosas que vão impressionar seus convidados!

**📊 INFORMAÇÕES DA RECEITA:**
• Tempo total: 2h (preparo: 30min + resfriamento: 1h + modelagem: 30min)
• Rendimento: 30-35 brigadeiros
• Nível: Intermediário
• Dificuldade: ⭐⭐⭐☆☆

**🥄 INGREDIENTES BASE:**
- 1 lata (395g) de leite condensado
- 1 colher de sopa (15g) de manteiga sem sal
- 1 pitada de sal

**🍫 CHOCOLATE BELGA:**
- 3 colheres de sopa (30g) de chocolate em pó 50% cacau
- 1 colher de chá de essência de baunilha
- Granulado belga para decorar

**🍓 MORANGO:**
- 2 colheres de sopa (20g) de pó para sorvete sabor morango
- 1 colher de chá de corante rosa (opcional)
- Granulado rosa para decorar

**🥜 PISTACHE:**
- 1 colher de sopa (15g) de pasta de pistache
- 1 colher de chá de essência de amêndoa
- Pistaches picados para decorar

**🔄 INGREDIENTES ALTERNATIVOS:**
• Leite condensado: use leite condensado de coco para versão vegana
• Manteiga: substitua por óleo de coco
• Chocolate: cacau em pó puro para versão mais amarga
• Morango: use purê de morango natural
• Pistache: use pasta de amêndoas como alternativa

**👨‍🍳 MODO DE PREPARO:**

**1. PREPARO DA BASE:**
- Em uma panela, misture o leite condensado, manteiga e sal
- Leve ao fogo baixo, mexendo sempre até desgrudar do fundo (15-20min)
- Divida a massa em três partes iguais

**2. CHOCOLATE BELGA:**
- Em uma parte, adicione o chocolate em pó e baunilha
- Misture bem até incorporar completamente
- Deixe esfriar e enrole em bolinhas
- Passe no granulado belga

**3. MORANGO:**
- Na segunda parte, adicione o pó de sorvete e corante
- Misture até obter cor uniforme
- Deixe esfriar e enrole em bolinhas
- Passe no granulado rosa

**4. PISTACHE:**
- Na terceira parte, adicione a pasta de pistache e essência
- Misture até incorporar bem
- Deixe esfriar e enrole em bolinhas
- Decore com pistaches picados

**💡 DICAS PROFISSIONAIS:**
- Mexa sempre para não queimar o fundo
- O ponto ideal é quando a massa desgruda da panela
- Deixe esfriar completamente antes de modelar
- Use luvas para modelar e evitar que grude nas mãos
- Conserve na geladeira por até 5 dias

**🎯 RESULTADO ESPERADO:**
Brigadeiros cremosos, saborosos e com textura perfeita, cada um com seu sabor único e decoração especial!`,
      category: 'receitas',
      categoryName: 'Receitas',
      author: 'Chef Maria Silva',
      date: new Date('2025-01-08'),
      readTime: '10 min',
      image: 'https://static.wixstatic.com/media/402ff2_0aa7de7a7b93469b8aafb9587dbb19cc~mv2.jpg',
      featured: true,
      tags: ['brigadeiro', 'gourmet', 'receita', 'sabores'],
      difficulty: 'Intermediário',
      totalTime: '2h',
      servings: '30-35 brigadeiros'
    },
    {
      id: 4,
      title: 'Como Armazenar Doces para Manter a Frescura',
      excerpt: 'Dicas essenciais para conservar seus doces caseiros e manter o sabor e textura perfeitos por mais tempo.',
      content: `O armazenamento correto dos doces é crucial para manter sua qualidade. Neste post, compartilhamos as melhores práticas profissionais para conservar seus doces caseiros!

**📊 INFORMAÇÕES DO POST:**
• Tempo de leitura: 4 minutos
• Nível: Básico
• Dificuldade: ⭐☆☆☆☆
• Aplicável a: Todos os tipos de doces

**🌡️ TEMPERATURA IDEAL**

**Refrigeração (2-8°C):**
- Bolos com recheios cremosos
- Doces à base de laticínios
- Mousses e cremes
- Doces com frutas frescas

**Temperatura Ambiente (18-22°C):**
- Bolos secos e biscoitos
- Doces de chocolate puro
- Balas e caramelos
- Doces desidratados

**Congelamento (-18°C):**
- Bolos inteiros (sem decoração)
- Massas de brigadeiro
- Coberturas prontas
- Ingredientes em excesso

**📦 EMBALAGENS IDEAIS**

**Potes Herméticos:**
- **Vidro:** Melhor para conservação
- **Plástico:** Prático e leve
- **Silicone:** Flexível e reutilizável
- **Metal:** Para ingredientes secos

**Papel e Celofane:**
- **Papel manteiga:** Para biscoitos
- **Celofane:** Para doces individuais
- **Papel alumínio:** Para chocolate
- **Sacos zip-lock:** Para pequenas porções

**🍰 TIPOS DE DOCES E CONSERVAÇÃO**

**Bolos:**
- **Com recheio:** Geladeira por 3-5 dias
- **Secos:** Ambiente por 7-10 dias
- **Congelados:** Até 3 meses
- **Dica:** Congele em fatias individuais

**Brigadeiros:**
- **Temperatura ambiente:** 2-3 dias
- **Geladeira:** 5-7 dias
- **Congelador:** 2-3 meses
- **Dica:** Enrole individualmente

**Cookies e Biscoitos:**
- **Ambiente seco:** 2-3 semanas
- **Geladeira:** 1-2 meses
- **Congelador:** 6-8 meses
- **Dica:** Use papel manteiga entre as camadas

**Tortas e Mousses:**
- **Geladeira:** 2-4 dias
- **Congelador:** 1-2 meses
- **Dica:** Congele sem decoração

**⚠️ ERROS COMUNS**

**Evite:**
- Misturar doces com sabores diferentes
- Usar embalagens inadequadas
- Armazenar em locais úmidos
- Deixar em contato com luz direta
- Não vedar adequadamente

**✅ BOAS PRÁTICAS**

**Organização:**
- Rotule com data de fabricação
- Use sistema FIFO (primeiro a entrar, primeiro a sair)
- Mantenha local limpo e seco
- Verifique regularmente o estado

**Controle de Qualidade:**
- Observe mudanças de cor
- Verifique textura e consistência
- Teste o sabor antes de servir
- Descarte se houver dúvidas

**🕐 TEMPO DE VALIDADE**

**Bolos:**
- **Com creme:** 3-5 dias (geladeira)
- **Secos:** 7-10 dias (ambiente)
- **Congelados:** 3 meses

**Doces de Chocolate:**
- **Temperatura ambiente:** 2-3 semanas
- **Geladeira:** 2-3 meses
- **Congelador:** 6-8 meses

**Biscoitos:**
- **Ambiente:** 2-3 semanas
- **Congelador:** 6-8 meses

**💡 DICAS PROFISSIONAIS:**
- Sempre esfrie completamente antes de armazenar
- Use ingredientes frescos para maior durabilidade
- Mantenha registros de validade
- Congele em porções práticas
- Descongele gradualmente na geladeira

**🎯 RESULTADO ESPERADO:**
Doces sempre frescos, saborosos e seguros para consumo, maximizando sua durabilidade e qualidade!`,
      category: 'dicas',
      categoryName: 'Dicas',
      author: 'Ana Costa',
      date: new Date('2025-01-05'),
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      featured: false,
      tags: ['armazenamento', 'conservação', 'dicas', 'frescura'],
      difficulty: 'Básico',
      totalTime: '4 min',
      servings: 'Técnicas gerais'
    },
    {
      id: 5,
      title: 'A História do Pudim: Do Egito Antigo aos Dias de Hoje',
      excerpt: 'Conheça a fascinante história do pudim, desde suas origens no Egito Antigo até as variações modernas que amamos.',
      content: `O pudim tem uma história rica e fascinante que remonta ao Egito Antigo. Neste post, exploramos sua evolução ao longo dos séculos e como se tornou uma das sobremesas mais amadas do mundo!

**📊 INFORMAÇÕES DO POST:**
• Tempo de leitura: 7 minutos
• Nível: Geral
• Dificuldade: ⭐☆☆☆☆
• Aplicável a: Conhecimento culinário

**🏺 ORIGENS ANTIGAS (3000 a.C.)**

**Egito Antigo:**
- Primeiros registros de pudins à base de leite
- Técnicas de cozimento em banho-maria
- Uso de mel como adoçante natural
- Preparados para rituais religiosos

**Grécia Antiga:**
- Desenvolvimento de técnicas de cozimento
- Introdução de especiarias
- Pudins de frutas e nozes
- Consumo em banquetes aristocráticos

**Roma Antiga:**
- Refinamento das receitas gregas
- Uso de ovos para textura
- Pudins salgados e doces
- Popularização entre todas as classes

**🌍 EVOLUÇÃO MEDIEVAL (500-1500 d.C.)**

**Idade Média:**
- Introdução do açúcar (século XII)
- Técnicas de cozimento aprimoradas
- Pudins de pão e frutas
- Uso de especiarias exóticas

**Renascimento:**
- Refinamento das técnicas culinárias
- Pudins elaborados para a nobreza
- Desenvolvimento de receitas regionais
- Primeiros livros de culinária

**🍮 ÉPOCA MODERNA (1500-1900)**

**Século XVI-XVIII:**
- Colonização e troca de ingredientes
- Introdução do chocolate na Europa
- Pudins de leite condensado
- Desenvolvimento de técnicas industriais

**Século XIX:**
- Revolução Industrial
- Produção em massa de ingredientes
- Pudins instantâneos
- Popularização mundial

**🌎 VERSÕES REGIONAIS**

**Brasil:**
- Pudim de leite condensado
- Influência portuguesa
- Técnicas artesanais
- Variações regionais

**França:**
- Crème brûlée
- Flan parisiense
- Técnicas refinadas
- Influência na confeitaria mundial

**Inglaterra:**
- Yorkshire pudding
- Bread pudding
- Técnicas tradicionais
- Pudins salgados e doces

**Estados Unidos:**
- Pudim instantâneo
- Variações industriais
- Técnicas modernas
- Popularização global

**🍰 TIPOS MODERNOS**

**Pudim de Leite Condensado:**
- Origem brasileira
- Ingredientes simples
- Técnica de banho-maria
- Popular em todo o mundo

**Crème Brûlée:**
- Origem francesa
- Caramelo quebradiço
- Técnica refinada
- Sobremesa de restaurante

**Flan:**
- Versão espanhola
- Caramelo líquido
- Textura cremosa
- Popular na América Latina

**Pudim de Pão:**
- Origem medieval
- Uso de pão amanhecido
- Técnica econômica
- Versão sustentável

**👨‍🍳 TÉCNICAS TRADICIONAIS**

**Banho-Maria:**
- Cozimento suave e uniforme
- Prevenção de queimaduras
- Textura cremosa perfeita
- Técnica milenar

**Caramelo:**
- Açúcar caramelizado
- Técnica de aquecimento
- Controle de temperatura
- Arte culinária

**Temperatura:**
- Controle preciso
- Textura ideal
- Prevenção de coalhadas
- Técnica profissional

**🌟 CURIOSIDADES HISTÓRICAS**

**Fatos Interessantes:**
- Pudim era considerado afrodisíaco na Idade Média
- Primeira receita escrita data de 1390
- Pudim de leite condensado foi criado no Brasil
- Crème brûlée foi redescoberta nos anos 1980

**Influências Culturais:**
- Técnicas árabes na Europa
- Ingredientes das Américas
- Métodos asiáticos
- Fusão de culturas

**💡 DICAS HISTÓRICAS:**
- Use técnicas tradicionais para melhor sabor
- Respeite as origens de cada receita
- Experimente variações regionais
- Mantenha a tradição viva

**🎯 RESULTADO ESPERADO:**
Conhecimento profundo sobre a rica história do pudim e apreciação pelas técnicas tradicionais que tornaram esta sobremesa atemporal!`,
      category: 'historia',
      categoryName: 'História',
      author: 'Chef João Santos',
      date: new Date('2025-01-03'),
      readTime: '7 min',
      image: 'https://cozinha365.com.br/wp-content/uploads/2025/02/Pudim-de-Leite-Condensado-S-1024x1024.webp',
      featured: false,
      tags: ['pudim', 'história', 'origem', 'culinária'],
      difficulty: 'Geral',
      totalTime: '7 min',
      servings: 'Conhecimento geral'
    }
  ]

  const blogPosts = getBlogPosts()

  const categories = [
    { id: 'todos', name: 'Todos os Posts', icon: BookOpen },
    { id: 'receitas', name: 'Receitas', icon: ChefHat },
    { id: 'dicas', name: 'Dicas', icon: Lightbulb },
    { id: 'historia', name: 'História', icon: BookOpen }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleShare = async (post) => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback para navegadores que não suportam Web Share API
        await navigator.clipboard.writeText(`${post.title}\n\n${post.excerpt}\n\n${window.location.href}`)
        alert('Link copiado para a área de transferência!')
      }
    } catch (error) {
      console.log('Erro ao compartilhar:', error)
      // Fallback adicional
      const textArea = document.createElement('textarea')
      textArea.value = `${post.title}\n\n${post.excerpt}\n\n${window.location.href}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copiado para a área de transferência!')
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    
    if (!newsletterEmail) {
      setNewsletterMessage('Por favor, digite seu e-mail!')
      return
    }

    if (!newsletterEmail.includes('@')) {
      setNewsletterMessage('Por favor, digite um e-mail válido!')
      return
    }

    // Simular cadastro na newsletter
    setNewsletterMessage('✅ Cadastro realizado com sucesso! Você receberá nossas receitas exclusivas!')
    setNewsletterEmail('')
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setNewsletterMessage('')
    }, 3000)
  }

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : BookOpen
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Geral'
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-6">
            Blog da Confeitaria
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Receitas exclusivas, dicas profissionais e histórias deliciosas da nossa confeitaria
          </p>
        </motion.div>

        {/* Busca e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por categoria */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts em Destaque */}
        {selectedCategory === 'todos' && searchTerm === '' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Posts em Destaque
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category)
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <CategoryIcon className="w-4 h-4" />
                          {getCategoryName(post.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date.toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      
                      {/* Badges de Informações da Receita */}
                      {post.difficulty && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            ⏱️ {post.totalTime}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            👥 {post.servings}
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            🎯 {post.difficulty}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                      >
                        Ler Post Completo
                      </button>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Todos os Posts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-pink-500" />
            {selectedCategory === 'todos' && searchTerm === '' ? 'Todos os Posts' : 'Posts Encontrados'}
          </h2>

          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum post encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros de busca ou explore outras categorias
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category)
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <CategoryIcon className="w-4 h-4" />
                          {getCategoryName(post.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date.toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      {/* Badges de Informações da Receita */}
                      {post.difficulty && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            ⏱️ {post.totalTime}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            👥 {post.servings}
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            🎯 {post.difficulty}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                      >
                        Ler Post Completo
                      </button>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Receba Nossas Receitas Exclusivas
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se em nossa newsletter e receba receitas exclusivas, dicas profissionais e novidades da confeitaria!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                >
                  Cadastrar
                </button>
              </div>
              {newsletterMessage && (
                <p className={`text-sm text-center ${newsletterMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Modal do Post Completo */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full max-h-[600px] h-auto object-contain bg-gray-100"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(selectedPost.category)
                      return <CategoryIcon className="w-4 h-4" />
                    })()}
                    {getCategoryName(selectedPost.category)}
                  </span>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date.toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedPost.excerpt}
                  </p>
                  
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                    >
                      Fechar
                    </button>
                    <button 
                      onClick={() => handleShare(selectedPost)}
                      className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-colors font-semibold"
                    >
                      Compartilhar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog
