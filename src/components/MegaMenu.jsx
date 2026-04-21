import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Cake, Heart, Star, Coffee, Gift } from 'lucide-react'
import { productService } from '../services/api'
import logger from '../utils/logger'

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryImages, setCategoryImages] = useState({})

  const normalizeCategoryKey = (category) => {
    const value = (category || '').toString().trim().toLowerCase()
    if (value.includes('bolo')) return 'bolos'
    if (value.includes('torta')) return 'tortas'
    if (value.includes('cup')) return 'cupcakes'
    if (value.includes('sobremesa')) return 'sobremesas'
    if (value.includes('doce')) return 'doces'
    return null
  }

  useEffect(() => {
    let cancelled = false

    async function loadImagesFromCatalog() {
      try {
        const res = await productService.getAll()
        const products = Array.isArray(res?.data) ? res.data : []
        const next = {}

        for (const p of products) {
          const key = normalizeCategoryKey(p?.category)
          if (!key) continue
          if (!next[key] && p?.image) next[key] = p.image
        }

        if (!cancelled) setCategoryImages(next)
      } catch (e) {
        logger.warn('MegaMenu: falha ao carregar imagens do cardápio', e?.message || e)
      }
    }

    loadImagesFromCatalog()
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => ([
    {
      id: 'bolos',
      name: 'Bolos',
      icon: Cake,
      description: 'Bolos artesanais para todas as ocasiões',
      image: categoryImages.bolos || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Ver Todos os Bolos', href: '/menu?category=bolos' }
      ]
    },
    {
      id: 'tortas',
      name: 'Tortas',
      icon: Heart,
      description: 'Tortas deliciosas e tradicionais',
      image: categoryImages.tortas || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Ver Todas as Tortas', href: '/menu?category=tortas' }
      ]
    },
    {
      id: 'cupcakes',
      name: 'Cupcakes',
      icon: Star,
      description: 'Cupcakes fofinhos e saborosos',
      image: categoryImages.cupcakes || 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Ver Todos os Cupcakes', href: '/menu?category=cupcakes' }
      ]
    },
    {
      id: 'doces',
      name: 'Doces',
      icon: Coffee,
      description: 'Doces finos e gourmet',
      image: categoryImages.doces || 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Ver Todos os Doces', href: '/menu?category=doces' }
      ]
    },
    {
      id: 'sobremesas',
      name: 'Sobremesas',
      icon: Gift,
      description: 'Sobremesas tradicionais e modernas',
      image: categoryImages.sobremesas || 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Ver Todas as Sobremesas', href: '/menu?category=sobremesas' }
      ]
    }
  ]), [categoryImages])

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
        onMouseEnter={() => setActiveCategory('menu')}
        onMouseLeave={() => setActiveCategory(null)}
      >
        <span>Cardápio</span>
        <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
      </button>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-screen max-w-5xl bg-white shadow-2xl border-t border-gray-100 z-50 max-h-[80vh] overflow-y-auto"
            onMouseEnter={() => setActiveCategory('menu')}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="max-w-4xl py-6 px-4">
              <div className="grid grid-cols-1 gap-6">
                {/* Categorias */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 p-3">
                            <div className="flex items-center space-x-2 text-white">
                              <category.icon size={16} />
                              <h3 className="font-semibold text-sm">{category.name}</h3>
                            </div>
                            <p className="text-white/80 text-xs mt-1 line-clamp-2">{category.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          {category.items.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                to={item.href}
                                className="block text-gray-600 hover:text-purple-600 text-xs transition-colors text-center py-1 px-2 rounded hover:bg-purple-50"
                              >
                                {item.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MegaMenu


