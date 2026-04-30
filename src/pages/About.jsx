import { motion } from 'framer-motion'
import { Heart, Award, Users, Clock, MapPin, Phone, Mail, Star, Shield, Coffee, Sparkles, Target, CheckCircle, Globe, Zap } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Heart, value: '500+', label: 'Clientes Felizes', color: 'from-pink-500 to-rose-500' },
    { icon: Award, value: '15+', label: 'Prêmios Conquistados', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, value: '5+', label: 'Anos de Experiência', color: 'from-blue-500 to-indigo-500' },
    { icon: Star, value: '4.9', label: 'Avaliação Média', color: 'from-purple-500 to-pink-500' }
  ]

  const values = [
    {
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas ingredientes selecionados e técnicas artesanais para garantir a melhor experiência gastronômica.',
      icon: Award,
      features: ['Ingredientes importados', 'Técnicas tradicionais', 'Controle de qualidade']
    },
    {
      title: 'Criatividade & Inovação',
      description: 'Cada criação é única, desenvolvida com amor e atenção aos detalhes para tornar seus momentos verdadeiramente especiais.',
      icon: Sparkles,
      features: ['Designs personalizados', 'Sabores únicos', 'Tendências culinárias']
    },
    {
      title: 'Compromisso Total',
      description: 'Nosso compromisso é superar suas expectativas, entregando produtos deliciosos e um atendimento excepcional.',
      icon: Target,
      features: ['Atendimento 24/7', 'Entrega pontual', 'Satisfação garantida']
    }
  ]

  const team = [
    {
      name: 'Maria Silva',
      role: 'Fundadora & Chef Confeiteira',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Apaixonada por confeitaria desde criança, Maria transformou sua paixão em um negócio de sucesso. Especialista em bolos artesanais e decorações únicas.',
      experience: '8 anos',
      specialties: ['Bolos Artesanais', 'Decorações', 'Gestão']
    },
    {
      name: 'João Santos',
      role: 'Chef Pâtissier',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      description: 'Especialista em doces finos e técnicas francesas, João traz elegância e sofisticação aos nossos produtos. Formado em culinária na França.',
      experience: '6 anos',
      specialties: ['Doces Finos', 'Técnicas Francesas', 'Chocolate']
    },
    {
      name: 'Ana Costa',
      role: 'Confeiteira Especialista',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      description: 'Criativa e detalhista, Ana é responsável por transformar ideias em doces únicos e memoráveis. Especialista em cupcakes e sobremesas.',
      experience: '4 anos',
      specialties: ['Cupcakes', 'Sobremesas', 'Criatividade']
    }
  ]

  const achievements = [
    { icon: Award, title: 'Melhor Confeitaria 2023', description: 'Prêmio da Associação de Confeiteiros de SP' },
    { icon: Star, title: '5 Estrelas no Google', description: 'Avaliação média de 4.9/5.0' },
    { icon: Globe, title: 'Certificação Internacional', description: 'Qualidade reconhecida mundialmente' },
    { icon: Shield, title: '100% Artesanal', description: 'Nenhum produto industrializado' }
  ]

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-dancing font-bold text-gray-800 mb-8">
            Sobre Nós
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Somos apaixonados por criar doces que não apenas alimentam o corpo, 
            mas também aquecem o coração e criam memórias inesquecíveis.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold">
            <Coffee className="w-5 h-5" />
            <span>Confeitaria Artesanal desde 2019</span>
          </div>
        </motion.div>

        {/* História */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-8">
                Nossa História
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Tudo começou em uma pequena cozinha de 15m², onde nossa fundadora Maria descobriu 
                  sua paixão pela confeitaria. Com receitas passadas de geração em geração 
                  e muito amor, ela transformou sonhos em realidade.
                </p>
                <p>
                  Hoje, nossa confeitaria é reconhecida pela qualidade excepcional e 
                  pela capacidade de transformar ingredientes simples em obras-primas 
                  que encantam paladares e corações.
                </p>
                <p>
                  Cada bolo, cada doce, cada sobremesa é criada com a mesma dedicação 
                  e carinho que nos move desde o primeiro dia.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full">
                  <span className="text-pink-700 font-semibold">🏆 Fundada em 2019</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full">
                  <span className="text-blue-700 font-semibold">📍 Vila Madalena, SP</span>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                  <span className="text-green-700 font-semibold">🌱 100% Artesanal</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Nossa História"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Anos de Tradição</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossos Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {value.description}
                </p>
                <div className="space-y-2">
                  {value.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f472b6&color=fff&size=300`
                    }}
                    className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {member.experience}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-pink-600 font-semibold mb-4 text-lg">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conquistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossas Conquistas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-pink-50 via-purple-50 to-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-4xl font-dancing font-bold text-gray-800 text-center mb-8">
            Entre em Contato
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Estamos prontos para transformar seus momentos especiais em memórias doces!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Endereço</h3>
                <p className="text-gray-600">
                  Rua das Delícias, 456<br />
                  Vila Madalena - São Paulo, SP<br />
                  CEP: 05435-070
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Telefone</h3>
                <p className="text-gray-600">
                  (11) 3344-5566<br />
                  WhatsApp: (11) 99999-9999
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Email</h3>
                <p className="text-gray-600">
                  contato@docurasesabores.com.br<br />
                  vendas@docurasesabores.com.br
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About


