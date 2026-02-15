import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Filter, Search, ThumbsUp, User } from 'lucide-react'
import { useQuery } from 'react-query'
import { productService } from '../services/api'

const Reviews = () => {
  const [selectedProduct, setSelectedProduct] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [allReviews, setAllReviews] = useState([])

  const { data: productsResponse } = useQuery(
    ['products'],
    () => productService.getAll(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const products = Array.isArray(productsResponse?.data) ? productsResponse.data : []

  // Carregar todas as reviews de todos os produtos
  useEffect(() => {
    const reviews = []
    products.forEach(product => {
      const productReviews = localStorage.getItem(`reviews_${product.id}`)
      if (productReviews) {
        const parsedReviews = JSON.parse(productReviews)
        parsedReviews.forEach(review => {
          reviews.push({
            ...review,
            productId: product.id,
            productName: product.name,
            productImage: product.image
          })
        })
      }
    })
    setAllReviews(reviews)
  }, [products])

  // Filtrar reviews
  const filteredReviews = allReviews.filter(review => {
    const productMatch = selectedProduct === 'todos' || review.productId.toString() === selectedProduct
    const searchMatch = searchTerm === '' || 
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return productMatch && searchMatch
  })

  const handleHelpful = (reviewId) => {
    const updatedReviews = allReviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    )
    setAllReviews(updatedReviews)
    
    // Atualizar no localStorage
    const productReviews = updatedReviews.filter(r => r.productId === allReviews.find(r => r.id === reviewId)?.productId)
    const productId = allReviews.find(r => r.id === reviewId)?.productId
    if (productId) {
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(productReviews))
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
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
            Avaliações dos Clientes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes estão falando sobre nossos produtos deliciosos
          </p>
        </motion.div>

        {/* Filtros */}
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
                placeholder="Buscar avaliações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por produto */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="todos">Todos os produtos</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">
              {allReviews.length}
            </div>
            <div className="text-gray-600">Total de Avaliações</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">
              {allReviews.length > 0 
                ? (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-gray-600">Nota Média</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">
              {allReviews.filter(r => r.rating === 5).length}
            </div>
            <div className="text-gray-600">5 Estrelas</div>
          </div>
        </motion.div>

        {/* Lista de Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma avaliação encontrada
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedProduct !== 'todos' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Seja o primeiro a avaliar nossos produtos!'
                }
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Imagem do produto */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Conteúdo da review */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {review.productName}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-pink-500" />
                            </div>
                            <span className="font-medium text-gray-700">{review.name}</span>
                          </div>
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
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Reviews
