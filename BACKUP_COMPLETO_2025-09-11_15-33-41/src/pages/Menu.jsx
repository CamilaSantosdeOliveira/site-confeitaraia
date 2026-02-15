import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Filter, Search } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useQuery } from 'react-query'
import { productService } from '../services/api'

const Menu = () => {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: products, isLoading } = useQuery(
    ['products', selectedCategory, searchTerm],
    () => {
      if (searchTerm) {
        return productService.search(searchTerm)
      }
      if (selectedCategory !== 'todos') {
        return productService.getByCategory(selectedCategory)
      }
      return productService.getAll()
    },
    {
      retry: false, // Não tentar novamente se falhar
      refetchOnWindowFocus: false, // Não refazer requisição ao focar na janela
    }
  )

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'bolos', name: 'Bolos' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'sobremesas', name: 'Sobremesas' },
    { id: 'doces', name: 'Doces Finos' },
    { id: 'tortas', name: 'Tortas' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-4">
            Nosso Cardápio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção de doces artesanais, feitos com ingredientes selecionados e muito amor
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
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lista de Produtos */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products?.data?.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-pink-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}</span>
                      <span className="ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mensagem se não houver produtos */}
        {products?.data?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              Nenhum produto encontrado para "{searchTerm}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Menu
