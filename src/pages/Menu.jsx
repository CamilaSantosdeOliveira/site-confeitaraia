import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Filter, Search, Heart, MessageCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContextReal'
import { useQuery } from 'react-query'
import { productService } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import ProductReviews from '../components/ProductReviews'
import BackButton from '../components/BackButton'
import logger from '../utils/logger'

const Menu = () => {
  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState(new Set())
  const [selectedProductForReviews, setSelectedProductForReviews] = useState(null)

  // Função temporária para corrigir imagem do Brigadeiro
  const fixBrigadeiroImage = async () => {
    try {
      const response = await fetch('http://localhost:8000/force_update_brigadeiro.php')
      const result = await response.json()
      logger.log('Resultado da atualização:', result)
      if (result.success) {
        alert('Imagem do Brigadeiro atualizada! Recarregue a página.')
        window.location.reload()
      }
    } catch (error) {
      logger.error('Erro ao atualizar imagem:', error)
    }
  }

  // Scroll suave para a seção de produtos quando há hash na URL
  useEffect(() => {
    if (window.location.hash === '#produtos') {
      setTimeout(() => {
        const element = document.getElementById('produtos')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  // Funções para gerenciar favoritos
  const toggleFavorite = async (productId) => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar favoritos!')
      return
    }

    try {
      const token = localStorage.getItem('auth-token')
      
      if (favorites.has(productId)) {
        // Remover dos favoritos
        const response = await fetch(`http://localhost:8000/user_favorites_simple.php?product_id=${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          setFavorites(prev => {
            const newFavorites = new Set(prev)
            newFavorites.delete(productId)
            return newFavorites
          })
        }
      } else {
        // Adicionar aos favoritos
        const response = await fetch('http://localhost:8000/user_favorites_simple.php', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product_id: productId })
        })
        
        if (response.ok) {
          setFavorites(prev => {
            const newFavorites = new Set(prev)
            newFavorites.add(productId)
            return newFavorites
          })
        }
      }
    } catch (error) {
      logger.error('Erro ao gerenciar favoritos:', error)
    }
  }

  const isFavorite = (productId) => favorites.has(productId)

  // Carregar favoritos reais quando o usuário estiver logado
  useEffect(() => {
    if (isAuthenticated && user) {
      loadFavorites()
    }
  }, [isAuthenticated, user])

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem('auth-token')
      const response = await fetch('http://localhost:8000/user_favorites_simple.php', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const favoritesData = await response.json()
        const favoriteIds = new Set(favoritesData.map(fav => fav.id))
        setFavorites(favoriteIds)
      }
    } catch (error) {
      logger.error('Erro ao carregar favoritos:', error)
    }
  }

  const { data: productsResponse, isLoading } = useQuery(
    ['products'],
    () => productService.getAll(),
    {
      retry: false, // Não tentar novamente se falhar
      refetchOnWindowFocus: false, // Não refazer requisição ao focar na janela
    }
  )

  // Extrair os produtos da resposta
  const products = Array.isArray(productsResponse?.data) ? productsResponse.data : []
  
  
  // Filtrar produtos baseado na categoria e busca
  const filteredProducts = products.filter((product) => {
    // Filtro por categoria - mapear categorias do banco para os IDs dos botões
    let categoryMatch = selectedCategory === 'todos'
    
    if (selectedCategory !== 'todos') {
      const categoryMapping = {
        'bolos': ['Bolos', 'bolos'],
        'cupcakes': ['Cupcakes', 'cupcakes'],
        'sobremesas': ['Sobremesas', 'sobremesas'],
        'tortas': ['Tortas', 'tortas'],
        'doces': ['Doces', 'doces', 'Doces Finos']
      }
      
      const validCategories = categoryMapping[selectedCategory] || []
      categoryMatch = validCategories.some(cat => 
        product.category?.toLowerCase().includes(cat.toLowerCase())
      )
    }
    
    // Filtro por busca
    const searchMatch = searchTerm === '' || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return categoryMatch && searchMatch
  })

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
          <div className="flex justify-start mb-4">
            <BackButton to="/" text="Voltar ao Início" />
          </div>
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-6">
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
        <div id="produtos" className="scroll-mt-24">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center max-w-7xl"
            >
            {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white rounded-full p-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
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
                      R$ {parseFloat(product.price).toFixed(2)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating || '4.5'}</span>
                      <span className="ml-1">({product.reviews || '0'})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          isFavorite(product.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                        {isFavorite(product.id) ? 'Favorito' : 'Favoritar'}
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Carrinho
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setSelectedProductForReviews(product)}
                      className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Ver Avaliações
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        )}
        </div>

        {/* Mensagem se não houver produtos */}
        {Array.isArray(filteredProducts) && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              {searchTerm ? `Nenhum produto encontrado para "${searchTerm}"` : 'Nenhum produto encontrado nesta categoria'}
            </p>
          </motion.div>
        )}

      </div>

      {/* Modal de Reviews */}
      {selectedProductForReviews && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProductForReviews(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductReviews 
              productId={selectedProductForReviews.id}
              productName={selectedProductForReviews.name}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Menu
