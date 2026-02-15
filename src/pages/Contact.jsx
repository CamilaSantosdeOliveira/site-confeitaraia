import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Star, Award, Users, Heart } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Estamos aqui para transformar seus momentos especiais em memórias doces! 
            Entre em contato conosco para encomendas personalizadas, dúvidas sobre nossos produtos 
            ou para conhecer mais sobre nossa confeitaria artesanal.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
            <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">500+</div>
            <div className="text-sm text-gray-600">Clientes Felizes</div>
          </div>
          <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
            <Award className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">5</div>
            <div className="text-sm text-gray-600">Anos de Experiência</div>
          </div>
          <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
            <Star className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">4.9</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">100%</div>
            <div className="text-sm text-gray-600">Artesanal</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl md:text-4xl font-dancing font-bold text-gray-800 mb-8 text-center">
              Nossas Informações
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">📍 Endereço</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Rua das Delícias, 456</strong><br />
                    Vila Madalena - São Paulo, SP<br />
                    CEP: 05435-070<br />
                    <span className="text-sm text-gray-500">Próximo ao metrô Vila Madalena</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">📞 Telefones</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>WhatsApp:</strong> (11) 99999-9999<br />
                    <strong>Fixo:</strong> (11) 3344-5566<br />
                    <span className="text-sm text-gray-500">Atendimento 24h via WhatsApp</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">✉️ E-mails</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Geral:</strong> contato@docurasesabores.com.br<br />
                    <strong>Encomendas:</strong> vendas@docurasesabores.com.br<br />
                    <strong>Suporte:</strong> suporte@docurasesabores.com.br
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">🕒 Horário de Funcionamento</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Terça a Sábado:</strong> 9h às 18h<br />
                    <strong>Domingo:</strong> 10h às 14h<br />
                    <strong>Segunda:</strong> Fechado para descanso<br />
                    <span className="text-sm text-gray-500">Encomendas com 48h de antecedência</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-10">
              <h3 className="font-bold text-gray-800 mb-6 text-xl text-center">🗺️ Nossa Localização</h3>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-80 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Mapa Interativo</p>
                  <p className="text-sm text-gray-500">Rua das Delícias, 456 - Vila Madalena</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-dancing font-bold text-gray-800 mb-4">
                Envie uma Mensagem
              </h2>
              <p className="text-gray-600">
                Preencha o formulário abaixo e entraremos em contato em até 24 horas
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Assunto *
                </label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="encomenda">🍰 Encomenda Personalizada</option>
                  <option value="duvida">❓ Dúvida sobre Produtos</option>
                  <option value="evento">🎉 Encomenda para Evento</option>
                  <option value="sugestao">💡 Sugestão</option>
                  <option value="reclamacao">📝 Reclamação</option>
                  <option value="parceria">🤝 Parceria</option>
                  <option value="outro">📝 Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 resize-none"
                  placeholder="Conte-nos mais sobre sua solicitação, data do evento, quantidade de pessoas, preferências de sabor, etc..."
                ></textarea>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-pink-600 mt-1" />
                  <div className="text-sm text-gray-700">
                    <strong>Dica:</strong> Para encomendas, informe a data do evento, quantidade de pessoas e suas preferências de sabor. 
                    Quanto mais detalhes, melhor poderemos atendê-lo!
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>

        {/* Seção de Depoimentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-dancing font-bold text-gray-800 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-gray-600">Depoimentos reais de quem já experimentou nossos doces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Os doces mais deliciosos que já provei! A qualidade é excepcional e o atendimento é perfeito."
              </p>
              <div className="font-semibold text-gray-800">Maria Silva</div>
              <div className="text-sm text-gray-500">Cliente há 2 anos</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Encomendei um bolo para o aniversário da minha filha e foi um sucesso! Todos elogiaram."
              </p>
              <div className="font-semibold text-gray-800">João Santos</div>
              <div className="text-sm text-gray-500">Cliente há 1 ano</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Atendimento personalizado e doces únicos. Recomendo para qualquer ocasião especial!"
              </p>
              <div className="font-semibold text-gray-800">Ana Costa</div>
              <div className="text-sm text-gray-500">Cliente há 3 anos</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-dancing font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600">Tire suas dúvidas mais comuns</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">⏰ Qual o prazo mínimo para encomendas?</h3>
              <p className="text-gray-600">Recomendamos 48 horas de antecedência para encomendas simples e 1 semana para eventos grandes ou decorações especiais.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">🚚 Vocês fazem entrega?</h3>
              <p className="text-gray-600">Sim! Entregamos em toda a Grande São Paulo. Consulte as taxas de entrega no momento da encomenda.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">💳 Quais formas de pagamento aceitas?</h3>
              <p className="text-gray-600">Aceitamos dinheiro, PIX, cartão de débito e crédito (à vista ou parcelado).</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-2">🌱 Vocês fazem doces veganos ou sem glúten?</h3>
              <p className="text-gray-600">Sim! Temos opções veganas e sem glúten. Consulte nosso cardápio especial ou entre em contato para mais informações.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact


