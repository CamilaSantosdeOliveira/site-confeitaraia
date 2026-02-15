import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, ShoppingCart, Heart, Clock, MapPin, Phone, AlertCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { productService } from '../services/api'
import { useApi } from '../hooks/useApi'
import LoadingSkeleton from '../components/LoadingSkeleton'
import StatsSection from '../components/StatsSection'
import ReviewsSection from '../components/ReviewsSection'
import NewsletterSignup from '../components/NewsletterSignup'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

const Home = () => {
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Buscar produtos em destaque com fallback para dados mock
  const { data: products, loading, error, isMock } = useApi(
    productService.getFeatured,
    []
  )

  // Dados mockados como fallback
  const mockProducts = [
    {
      id: 1,
      name: 'Bolo de Chocolate Belga',
      description: 'A união perfeita de cacau 70% e um recheio cremoso. Irresistível!',
      price: 95.00,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      category: 'bolos',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      name: 'Cupcakes Red Velvet',
      description: 'Massa aveludada com cobertura de cream cheese. Delicadeza em cada mordida.',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      category: 'cupcakes',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: 'Pudim Caseiro',
      description: 'Cremoso pudim de leite condensado com calda de açúcar caramelizado.',
      price: 25.00,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      category: 'sobremesas',
      rating: 4.9,
      reviews: 156
    }
  ]

  const displayProducts = Array.isArray(products) ? products : mockProducts

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: 'A vida é mais doce com',
      subtitle: 'Doçuras & Sabores',
      description: 'Bolos, doces finos e sobremesas que encantam seu paladar e alegram seus momentos especiais.',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
    },
    {
      title: 'Sabor e qualidade em',
      subtitle: 'cada detalhe',
      description: 'Ingredientes selecionados e técnicas artesanais para criar experiências únicas.',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
    },
    {
      title: 'Momentos especiais',
      subtitle: 'merecem doces especiais',
      description: 'Celebre suas conquistas e momentos importantes com nossos doces exclusivos.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80'
    }
  ]

  if (loading) {
    return <LoadingSkeleton type="hero" />
  }

  // Mostrar aviso se estiver usando dados mock
  const showMockWarning = isMock && !error

  return (
    <div className="pt-20">
      {/* Aviso de dados mock */}
      {showMockWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
        >
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
            <div>
              <p className="text-sm text-yellow-700">
                <strong>Modo Demonstração:</strong> Exibindo dados de exemplo. O backend não está disponível.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Confeitaria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-pink-900/50 to-yellow-900/70" />
        </div>
        
        <div className="relative z-1 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
                         <motion.h1
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-2xl"
             >
               {heroSlides[currentSlide].title}
               <br />
               <span className="font-dancing text-6xl md:text-8xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                 {heroSlides[currentSlide].subtitle}
               </span>
             </motion.h1>
            
                         <motion.p
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-xl md:text-2xl mb-8 text-white font-semibold drop-shadow-lg"
             >
               {heroSlides[currentSlide].description}
             </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                                            <Link to="/menu" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 border-2 border-white/30 animate-pulse">
                 Ver Cardápio Completo
               </Link>
               <Link to="/contact" className="bg-white/90 backdrop-blur-sm border-2 border-white text-purple-600 hover:bg-white hover:text-purple-700 font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
                 Fazer Pedido
               </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 text-white"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Featured Products */}
             <section className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
                         <h2 className="text-4xl md:text-5xl font-bold mb-4">
               Nossos <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">Destaques</span>
             </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossos produtos mais amados pelos clientes
            </p>
          </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {displayProducts.length === 0 ? (
               <LoadingSkeleton type="card" count={3} />
             ) : (
               displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                                 className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group border border-purple-100"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <Heart size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                                         <button
                       onClick={() => addToCart(product)}
                       className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                     >
                       <ShoppingCart size={16} />
                       <span>Adicionar</span>
                     </button>
                  </div>
                                 </div>
               </motion.div>
             ))
             )}
           </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
                         <Link to="/menu" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-purple-200">
               Ver Cardápio Completo
             </Link>
          </motion.div>
        </div>
      </section>

             {/* About Section */}
       <section className="section-padding relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
         {/* Elementos decorativos de fundo */}
         <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/10 rounded-full blur-2xl"></div>

         <div className="container-custom relative z-10">
           {/* Header da seção */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-16"
           >
             <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6">
               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
               <span className="text-purple-700 font-medium text-sm">Nossa História</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-bold mb-6">
               Uma <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">Jornada</span> de Sabor e Dedicação
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               Há mais de uma década, transformamos sonhos em doces e momentos em memórias inesquecíveis
             </p>
           </motion.div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Conteúdo textual */}
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="space-y-8"
             >
               {/* Cards de valores */}
               <div className="space-y-6">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.1 }}
                   viewport={{ once: true }}
                   className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                 >
                   <div className="flex items-start space-x-4">
                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                       <Heart size={24} className="text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-2">Paixão por Qualidade</h3>
                       <p className="text-gray-600 leading-relaxed">
                         Cada receita é desenvolvida com ingredientes premium e técnicas artesanais, 
                         garantindo sabor e textura excepcionais em cada mordida.
                       </p>
                     </div>
                   </div>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                   viewport={{ once: true }}
                   className="bg-white/60 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                 >
                   <div className="flex items-start space-x-4">
                     <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-3 rounded-xl">
                       <Star size={24} className="text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-2">Experiência Única</h3>
                       <p className="text-gray-600 leading-relaxed">
                         Criamos não apenas doces, mas experiências memoráveis que transformam 
                         momentos especiais em celebrações inesquecíveis.
                       </p>
                     </div>
                   </div>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                   viewport={{ once: true }}
                   className="bg-white/60 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                 >
                   <div className="flex items-start space-x-4">
                     <div className="bg-gradient-to-r from-yellow-500 to-purple-500 p-3 rounded-xl">
                       <Clock size={24} className="text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-2">Tradição e Inovação</h3>
                       <p className="text-gray-600 leading-relaxed">
                         Combinamos técnicas tradicionais com criatividade moderna, 
                         oferecendo produtos únicos que respeitam a tradição e abraçam o futuro.
                       </p>
                     </div>
                   </div>
                 </motion.div>
               </div>

               {/* Estatísticas profissionais */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 viewport={{ once: true }}
                 className="grid grid-cols-3 gap-6 pt-6"
               >
                 <div className="text-center">
                   <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">10+</div>
                   <div className="text-gray-600 font-medium">Anos de Excelência</div>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">2.5k+</div>
                   <div className="text-gray-600 font-medium">Clientes Satisfeitos</div>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent mb-2">500+</div>
                   <div className="text-gray-600 font-medium">Eventos Realizados</div>
                 </div>
               </motion.div>
             </motion.div>
             
             {/* Imagem e informações */}
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="relative"
             >
               <div className="relative">
                 <img
                   src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                   alt="Nossa Confeitaria"
                   className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                 />
                 
                 {/* Overlay gradiente */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>
                 
                 {/* Card flutuante de horário */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.5 }}
                   viewport={{ once: true }}
                   className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20"
                 >
                   <div className="flex items-center space-x-4">
                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                       <Clock size={24} className="text-white" />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-800 mb-1">Horário de Funcionamento</h4>
                       <p className="text-sm text-gray-600">Terça a Sábado: 9h às 18h</p>
                       <p className="text-sm text-gray-600">Domingo: 10h às 14h</p>
                     </div>
                   </div>
                 </motion.div>

                 {/* Badge de qualidade */}
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.6, delay: 0.6 }}
                   viewport={{ once: true }}
                   className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                 >
                   <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-sm font-medium text-gray-700">Qualidade Premium</span>
                   </div>
                 </motion.div>
               </div>
             </motion.div>
           </div>
         </div>
       </section>

      {/* Contact CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Background com imagem e overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80"
            alt="Confeitaria Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/70 to-yellow-900/80"></div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Badge profissional */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Atendimento Premium</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Pronto para adoçar seu dia?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Entre em contato conosco e faça seu pedido personalizado com a qualidade que você merece
              </p>
              
              {/* Cards de contato profissionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <a
                    href="https://wa.me/5511999887766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 p-3 rounded-xl group-hover:bg-green-600 transition-colors">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-bold text-lg">WhatsApp</h3>
                        <p className="text-white/70 text-sm">Pedido rápido e fácil</p>
                      </div>
                    </div>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <a
                    href="tel:+551133445566"
                    className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500 p-3 rounded-xl group-hover:bg-blue-600 transition-colors">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-bold text-lg">Telefone</h3>
                        <p className="text-white/70 text-sm">Atendimento personalizado</p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Informações adicionais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Resposta em até 5 minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">Entrega em toda a cidade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Pedidos personalizados</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Stats Section */}
       <StatsSection />

       {/* Reviews Section */}
       <ReviewsSection />

       {/* Newsletter Section */}
       <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
           >
             <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
               Fique por dentro das novidades
             </h2>
             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
               Receba ofertas exclusivas, novos sabores e dicas especiais diretamente no seu e-mail
             </p>
           </motion.div>
           
           <div className="max-w-2xl mx-auto">
             <NewsletterSignup />
           </div>
         </div>
       </section>

       {/* Floating WhatsApp */}
       <FloatingWhatsApp />
     </div>
   )
 }

export default Home
