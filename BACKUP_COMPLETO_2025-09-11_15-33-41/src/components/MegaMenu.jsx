import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Cake, Heart, Star, Coffee, Gift } from 'lucide-react'

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null)

  const categories = [
    {
      id: 'bolos',
      name: 'Bolos',
      icon: Cake,
      description: 'Bolos artesanais para todas as ocasiões',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Bolos de Aniversário', href: '/menu?category=aniversario' },
        { name: 'Bolos de Casamento', href: '/menu?category=casamento' },
        { name: 'Bolos Decorados', href: '/menu?category=decorados' },
        { name: 'Bolos Simples', href: '/menu?category=simples' }
      ]
    },
    {
      id: 'doces',
      name: 'Doces Finos',
      icon: Heart,
      description: 'Doces gourmet e sobremesas especiais',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Trufas', href: '/menu?category=trufas' },
        { name: 'Brigadeiros', href: '/menu?category=brigadeiros' },
        { name: 'Cupcakes', href: '/menu?category=cupcakes' },
        { name: 'Macarons', href: '/menu?category=macarons' }
      ]
    },
    {
      id: 'sobremesas',
      name: 'Sobremesas',
      icon: Star,
      description: 'Sobremesas tradicionais e modernas',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Pudins', href: '/menu?category=pudins' },
        { name: 'Mousses', href: '/menu?category=mousses' },
        { name: 'Tortas', href: '/menu?category=tortas' },
        { name: 'Sorvetes', href: '/menu?category=sorvetes' }
      ]
    },
    {
      id: 'cafes',
      name: 'Café da Manhã',
      icon: Coffee,
      description: 'Pães, croissants e acompanhamentos',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Pães Artesanais', href: '/menu?category=paes' },
        { name: 'Croissants', href: '/menu?category=croissants' },
        { name: 'Muffins', href: '/menu?category=muffins' },
        { name: 'Biscoitos', href: '/menu?category=biscoitos' }
      ]
    },
    {
      id: 'presentes',
      name: 'Kits Presente',
      icon: Gift,
      description: 'Caixas e cestas personalizadas',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      items: [
        { name: 'Caixas de Bombons', href: '/menu?category=caixas' },
        { name: 'Cestas Gourmet', href: '/menu?category=cestas' },
        { name: 'Kits Especiais', href: '/menu?category=kits' },
        { name: 'Presentes Corporativos', href: '/menu?category=corporate' }
      ]
    }
  ]

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
            className="absolute top-full left-0 w-screen bg-white shadow-2xl border-t border-gray-100 z-50"
            onMouseEnter={() => setActiveCategory('menu')}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="container-custom py-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Categorias */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <div className="flex items-center space-x-2 text-white">
                              <category.icon size={20} />
                              <h3 className="font-semibold">{category.name}</h3>
                            </div>
                            <p className="text-white/80 text-sm mt-1">{category.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          {category.items.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                to={item.href}
                                className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
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

                {/* Destaque */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Destaque da Semana</h3>
                      <p className="text-gray-600 mb-4">Descubra nossas novidades e promoções especiais</p>
                      
                      <div className="space-y-3">
                        <Link
                          to="/menu?featured=true"
                          className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                        >
                          Ver Destaques
                        </Link>
                        <Link
                          to="/menu?promo=true"
                          className="block w-full bg-white border-2 border-purple-500 text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-300"
                        >
                          Promoções
                        </Link>
                      </div>
                    </div>
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

