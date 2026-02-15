import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter, Star, Clock, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const searchRef = useRef(null)

  // Dados mockados para demonstração
  const products = [
    { id: 1, name: 'Bolo de Chocolate Belga', category: 'bolos', price: 95.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80' },
    { id: 2, name: 'Cupcakes Red Velvet', category: 'cupcakes', price: 12.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80' },
    { id: 3, name: 'Pudim Caseiro', category: 'sobremesas', price: 25.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80' },
    { id: 4, name: 'Trufas de Chocolate', category: 'doces', price: 8.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80' },
    { id: 5, name: 'Bolo de Aniversário', category: 'bolos', price: 120.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80' }
  ]

  const categories = [
    { name: 'Bolos', count: 15, icon: '🎂' },
    { name: 'Cupcakes', count: 8, icon: '🧁' },
    { name: 'Doces Finos', count: 12, icon: '🍫' },
    { name: 'Sobremesas', count: 10, icon: '🍰' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm)
    setIsOpen(false)
    
    // Adicionar à busca recente
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            <div className="p-6">
              {/* Busca Rápida */}
              {query.length > 2 && suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Search size={16} className="mr-2" />
                    Resultados para "{query}"
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ backgroundColor: '#f8fafc' }}
                        className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors"
                        onClick={() => handleSearch(product.name)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{product.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="capitalize">{product.category}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-current mr-1" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-purple-600">R$ {product.price.toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categorias Populares */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Categorias Populares
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                      onClick={() => handleSearch(category.name)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Buscas Recentes */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Clock size={16} className="mr-2" />
                    Buscas Recentes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtros Avançados */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filtros Avançados
                  </h3>
                  <Link
                    to="/menu"
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Ver todos os produtos
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar

