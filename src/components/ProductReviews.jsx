import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react'

const ProductReviews = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Carregar reviews do localStorage (simulação)
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${productId}`)
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      // Reviews de exemplo específicos por produto
      const name = (productName || '').toLowerCase()

      const getExampleReviews = () => {
        if (name.includes('cupcake')) {
          return [
            {
              id: 1,
              name: 'Maria Silva',
              rating: 5,
              comment: 'Massa fofa, cor vibrante e cream cheese no ponto. Perfeito para aniversários!',
              date: new Date('2025-01-12'),
              helpful: 14
            },
            {
              id: 2,
              name: 'João Santos',
              rating: 4,
              comment: 'Muito saboroso e fresquinho. Gostei do equilíbrio entre cacau e cobertura.',
              date: new Date('2025-01-10'),
              helpful: 9
            },
            {
              id: 3,
              name: 'Ana Costa',
              rating: 5,
              comment: 'Chegaram intactos e lindos. Textura leve e umidade perfeita. Recomendo!',
              date: new Date('2025-01-07'),
              helpful: 18
            }
          ]
        }

        if (name.includes('pudim')) {
          return [
            {
              id: 1,
              name: 'Carla Nunes',
              rating: 5,
              comment: 'Cremoso e com calda brilhante. Sabor caseiro de verdade!',
              date: new Date('2025-01-11'),
              helpful: 11
            },
            {
              id: 2,
              name: 'Pedro Lima',
              rating: 4,
              comment: 'Textura impecável, só achei a calda um pouco doce. Ainda assim, excelente.',
              date: new Date('2025-01-09'),
              helpful: 7
            },
            {
              id: 3,
              name: 'Bruna Alves',
              rating: 5,
              comment: 'Derrete na boca. Compraria novamente sem pensar!',
              date: new Date('2025-01-06'),
              helpful: 13
            }
          ]
        }

        if (name.includes('brigadeiro')) {
          return [
            {
              id: 1,
              name: 'Marcos Vieira',
              rating: 5,
              comment: 'Sabor intenso e ponto perfeito. Os granulados são de ótima qualidade.',
              date: new Date('2025-01-10'),
              helpful: 10
            },
            {
              id: 2,
              name: 'Paula Rocha',
              rating: 4,
              comment: 'Muito bom! Cremoso por dentro e bem enroladinho.',
              date: new Date('2025-01-08'),
              helpful: 6
            },
            {
              id: 3,
              name: 'Igor Martins',
              rating: 5,
              comment: 'Os sabores gourmet são incríveis. O de pistache virou meu favorito.',
              date: new Date('2025-01-05'),
              helpful: 12
            }
          ]
        }

        if (name.includes('bolo')) {
          return [
            {
              id: 1,
              name: 'Helena Souza',
              rating: 5,
              comment: 'Bolo super úmido, cobertura equilibrada e aroma delicioso.',
              date: new Date('2025-01-12'),
              helpful: 16
            },
            {
              id: 2,
              name: 'Rafael Moreira',
              rating: 4,
              comment: 'Textura ótima. Preferiria um pouco mais de cacau, mas está excelente.',
              date: new Date('2025-01-09'),
              helpful: 8
            },
            {
              id: 3,
              name: 'Luisa Prado',
              rating: 5,
              comment: 'Entrega pontual e bolo muito bem finalizado. Virou o preferido da família.',
              date: new Date('2025-01-06'),
              helpful: 17
            }
          ]
        }

        if (name.includes('torta')) {
          return [
            {
              id: 1,
              name: 'Fernanda Dias',
              rating: 5,
              comment: 'Massa crocante e recheio equilibrado. Doce na medida certa!',
              date: new Date('2025-01-11'),
              helpful: 9
            },
            {
              id: 2,
              name: 'Diego Ramos',
              rating: 4,
              comment: 'Bem montada e saborosa. A apresentação está impecável.',
              date: new Date('2025-01-08'),
              helpful: 5
            },
            {
              id: 3,
              name: 'Talita Gomes',
              rating: 5,
              comment: 'Recheio generoso e fresquinho. Ótima para datas especiais.',
              date: new Date('2025-01-05'),
              helpful: 12
            }
          ]
        }

        // Padrão genérico
        return [
          {
            id: 1,
            name: 'Maria Silva',
            rating: 5,
            comment: `Delicioso! O melhor ${productName || 'doce'} que já provei. Recomendo!`,
            date: new Date('2025-01-10'),
            helpful: 12
          },
          {
            id: 2,
            name: 'João Santos',
            rating: 4,
            comment: `Muito bom! A textura do ${productName || 'produto'} é excelente.`,
            date: new Date('2025-01-08'),
            helpful: 8
          },
          {
            id: 3,
            name: 'Ana Costa',
            rating: 5,
            comment: `Perfeito! ${productName || 'doce'} com textura incrível e sabor maravilhoso.`,
            date: new Date('2025-01-05'),
            helpful: 15
          }
        ]
      }

      setReviews(getExampleReviews())
    }
  }, [productId])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!newReview.comment.trim() || !newReview.name.trim()) return

    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      const review = {
        id: Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date(),
        helpful: 0
      }

      const updatedReviews = [review, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews))

      setNewReview({ rating: 5, comment: '', name: '' })
      setShowForm(false)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    )
    setReviews(updatedReviews)
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews))
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "div"}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Avaliações de {productName}
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-semibold text-gray-700">
                {averageRating}
              </span>
            </div>
            <span className="text-gray-500">
              ({reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''})
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Avaliar
        </button>
      </div>

      {/* Formulário de Avaliação */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Deixe sua avaliação
            </h4>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua nota:
                </label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview(prev => ({ ...prev, rating }))
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu nome:
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua avaliação:
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows="3"
                  placeholder="Conte sua experiência com este produto..."
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:bg-gray-300 transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {review.date.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful}
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductReviews
