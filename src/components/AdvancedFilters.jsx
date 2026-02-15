import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Star, DollarSign, SortAsc, SortDesc, X } from 'lucide-react'

const AdvancedFilters = ({ onFiltersChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 200],
    rating: 0,
    inStock: false,
    featured: false
  })
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { id: 'bolos', name: 'Bolos', count: 15 },
    { id: 'cupcakes', name: 'Cupcakes', count: 8 },
    { id: 'doces', name: 'Doces Finos', count: 12 },
    { id: 'sobremesas', name: 'Sobremesas', count: 10 },
    { id: 'paes', name: 'Pães', count: 6 },
    { id: 'presentes', name: 'Kits Presente', count: 5 }
  ]

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'name-desc', label: 'Nome Z-A' },
    { value: 'price', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'rating', label: 'Melhor Avaliados' },
    { value: 'newest', label: 'Mais Recentes' }
  ]

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId]
    
    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters, priceRange: [min, max] }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, rating }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    onSortChange(value)
  }

  const clearFilters = () => {
    const newFilters = {
      categories: [],
      priceRange: [0, 200],
      rating: 0,
      inStock: false,
      featured: false
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const activeFiltersCount = filters.categories.length + 
    (filters.rating > 0 ? 1 : 0) + 
    (filters.inStock ? 1 : 0) + 
    (filters.featured ? 1 : 0)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter size={24} className="text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
              {activeFiltersCount} ativo{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Ordenação */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
          <SortAsc size={16} className="mr-2" />
          Ordenar por
        </h4>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Categorias</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.label
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                {category.count}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
          <DollarSign size={16} className="mr-2" />
          Faixa de Preço
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">R$ {filters.priceRange[0]}</span>
            <span className="text-sm text-gray-600">R$ {filters.priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), filters.priceRange[1])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
            />
          </div>
        </div>
      </div>

      {/* Avaliação */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
          <Star size={16} className="mr-2" />
          Avaliação Mínima
        </h4>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRatingChange(rating)}
              className={`p-2 rounded-lg transition-colors ${
                filters.rating >= rating
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Star size={20} className={filters.rating >= rating ? 'fill-current' : ''} />
            </motion.button>
          ))}
        </div>
        {filters.rating > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {filters.rating}+ estrelas
          </p>
        )}
      </div>

      {/* Filtros Adicionais */}
      <div className="space-y-3">
        <motion.label
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
        >
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => {
              const newFilters = { ...filters, inStock: e.target.checked }
              setFilters(newFilters)
              onFiltersChange(newFilters)
            }}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="font-medium text-gray-700">Em Estoque</span>
        </motion.label>

        <motion.label
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
        >
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => {
              const newFilters = { ...filters, featured: e.target.checked }
              setFilters(newFilters)
              onFiltersChange(newFilters)
            }}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="font-medium text-gray-700">Destaques</span>
        </motion.label>
      </div>

      {/* Estilos CSS para o slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default AdvancedFilters












