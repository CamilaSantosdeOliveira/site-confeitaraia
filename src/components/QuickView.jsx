import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, ShoppingCart, Minus, Plus, Eye, Share2 } from 'lucide-react'
import { useCart } from '../contexts/CartContextReal'

const QuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const { addToCart } = useCart()

  if (!product) return null

  const images = [
    product.image,
    product.image.replace('w=300', 'w=400'),
    product.image.replace('w=300', 'w=500'),
    product.image.replace('w=300', 'w=600')
  ]

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    onClose()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlist
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={isWishlist ? 'fill-current' : ''} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors">
                  <Share2 size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Imagens */}
              <div className="lg:w-1/2 p-6">
                <div className="relative">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                    {product.category}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-3 mt-4">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-purple-500 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Informações */}
              <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  {/* Avaliação */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating || 4.5)}
                    </div>
                    <span className="text-gray-600">({product.rating || 4.5})</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">128 avaliações</span>
                  </div>

                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-purple-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || 'Produto artesanal feito com ingredientes selecionados e muito carinho. Perfeito para momentos especiais e para adoçar seu dia.'}
                    </p>
                  </div>

                  {/* Características */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Características</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Ingredientes Naturais</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Sem Conservantes</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Produção Artesanal</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Entrega Rápida</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="border-t border-gray-100 pt-6">
                  {/* Quantidade */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-800">Quantidade:</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={20} />
                      <span>Adicionar ao Carrinho</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 border-2 border-purple-500 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye size={20} />
                      <span>Ver Detalhes</span>
                    </motion.button>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Entrega em até 2 horas • Frete grátis acima de R$ 100</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default QuickView


