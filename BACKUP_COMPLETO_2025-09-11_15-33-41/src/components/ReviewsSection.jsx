import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const reviews = [
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment: "Os bolos são simplesmente divinos! A qualidade é excepcional e o sabor é único. Recomendo para todos os eventos especiais.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "2 dias atrás",
      product: "Bolo de Chocolate Especial"
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      comment: "Pedido entregue no prazo, bolo lindo e delicioso. A equipe é muito profissional e atenciosa. Super recomendo!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "1 semana atrás",
      product: "Bolo de Aniversário Personalizado"
    },
    {
      id: 3,
      name: "Ana Costa",
      rating: 5,
      comment: "Melhor confeitaria da cidade! Os doces são artesanais e feitos com muito carinho. Já é minha confeitaria de confiança.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "3 dias atrás",
      product: "Kit Doces Finos"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      rating: 5,
      comment: "Excelente atendimento e produtos de primeira qualidade. O bolo do meu casamento ficou perfeito, exatamente como eu queria!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2 semanas atrás",
      product: "Bolo de Casamento"
    },
    {
      id: 5,
      name: "Fernanda Lima",
      rating: 5,
      comment: "Sobremesas incríveis! Cada mordida é uma experiência única. A apresentação é linda e o sabor é incomparável.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "5 dias atrás",
      product: "Sobremesa Tiramisu"
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mais de 500 clientes satisfeitos e milhares de momentos doces criados com carinho
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex items-center justify-center mb-6">
                <Quote size={32} className="text-purple-400" />
              </div>

              <div className="text-center mb-8">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-6">
                  "{reviews[currentReview].comment}"
                </p>
                
                <div className="flex justify-center mb-4">
                  {renderStars(reviews[currentReview].rating)}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={reviews[currentReview].avatar}
                    alt={reviews[currentReview].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {reviews[currentReview].date}
                    </p>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center space-x-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">
                  <Heart size={14} className="fill-current" />
                  <span>{reviews[currentReview].product}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-purple-600 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-purple-600 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentReview(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-purple-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
            <div className="text-gray-600">Pedidos Entregues</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReviewsSection

