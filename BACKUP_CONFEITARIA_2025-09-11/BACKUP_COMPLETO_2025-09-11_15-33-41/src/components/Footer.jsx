import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"></div>
      
      {/* Decorações flutuantes */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 font-dancing">
              Doçuras & Sabores
            </h3>
            <p className="text-white/90 mb-6">
              Doces feitos com amor para adoçar cada momento da sua vida. 
              Qualidade e sabor inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/docurasesabores"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 hover:bg-primary-700 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/docurasesabores"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5511999887766"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </motion.div>

          {/* Navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-white/80 hover:text-white transition-colors">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Fale Conosco</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-white/80 text-sm">
                  Rua das Delícias, 456<br />
                  Vila Madalena, São Paulo - SP
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+551133445566"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  (11) 3344-5566
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:contato@docurasesabores.com.br"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  contato@docurasesabores.com.br
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-white/80 text-sm">
                  Ter-Sáb: 9h-18h<br />
                  Dom: 10h-14h
                </p>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4 text-sm">
              Receba nossas novidades e promoções exclusivas!
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-white/40 text-white placeholder-white/60"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Inscrever-se
              </button>
            </form>
          </motion.div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Doçuras & Sabores. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacidade
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
