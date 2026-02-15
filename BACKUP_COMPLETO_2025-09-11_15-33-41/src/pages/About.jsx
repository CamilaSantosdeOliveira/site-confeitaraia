import { motion } from 'framer-motion'
import { Heart, Award, Users, Clock, MapPin, Phone, Mail } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Heart, value: '500+', label: 'Clientes Satisfeitos' },
    { icon: Award, value: '50+', label: 'Prêmios Conquistados' },
    { icon: Users, value: '10+', label: 'Anos de Experiência' },
    { icon: Clock, value: '24h', label: 'Atendimento' }
  ]

  const values = [
    {
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas ingredientes selecionados e técnicas artesanais para garantir a melhor experiência.',
      icon: Award
    },
    {
      title: 'Criatividade',
      description: 'Cada criação é única, desenvolvida com amor e atenção aos detalhes para tornar seus momentos especiais.',
      icon: Heart
    },
    {
      title: 'Compromisso',
      description: 'Nosso compromisso é superar suas expectativas, entregando produtos deliciosos e um atendimento excepcional.',
      icon: Users
    }
  ]

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-dancing font-bold text-gray-800 mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos apaixonados por criar doces que não apenas alimentam o corpo, 
            mas também aquecem o coração e criam memórias inesquecíveis.
          </p>
        </motion.div>

        {/* História */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h2 className="text-3xl font-dancing font-bold text-gray-800 mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Tudo começou em uma pequena cozinha, onde nossa fundadora Maria descobriu 
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
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Nossa História"
              className="rounded-xl shadow-lg"
            />
          </div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-pink-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
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
          <h2 className="text-3xl font-dancing font-bold text-gray-800 text-center mb-12">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                alt="Maria Silva"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Maria Silva
              </h3>
              <p className="text-pink-600 font-medium mb-2">
                Fundadora & Chef Confeiteira
              </p>
              <p className="text-gray-600 text-sm">
                Apaixonada por confeitaria desde criança, Maria transformou sua paixão em um negócio de sucesso.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                alt="João Santos"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                João Santos
              </h3>
              <p className="text-pink-600 font-medium mb-2">
                Chef Pâtissier
              </p>
              <p className="text-gray-600 text-sm">
                Especialista em doces finos e técnicas francesas, João traz elegância e sofisticação aos nossos produtos.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                alt="Ana Costa"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ana Costa
              </h3>
              <p className="text-pink-600 font-medium mb-2">
                Confeiteira Especialista
              </p>
              <p className="text-gray-600 text-sm">
                Criativa e detalhista, Ana é responsável por transformar ideias em doces únicos e memoráveis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl p-8"
        >
          <h2 className="text-3xl font-dancing font-bold text-gray-800 text-center mb-8">
            Entre em Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Endereço</h3>
                <p className="text-gray-600">Rua das Flores, 123<br />Centro - São Paulo, SP</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Telefone</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">contato@confeitaria.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

