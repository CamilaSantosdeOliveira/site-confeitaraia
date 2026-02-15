import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, Settings, ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContextReal'
import { useAuth } from '../contexts/AuthContext'
import MegaMenu from './MegaMenu'
import MiniCart from './MiniCart'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/menu', label: 'Cardápio' },
    { path: '/about', label: 'Sobre Nós' },
    { path: '/contact', label: 'Contato' },
  ]

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  // Não mostrar Header nas rotas de admin
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/painel-admin-secreto')) {
    return null
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-purple-100' 
        : 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20'
    }`}>
      <div className="container-custom max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4 w-full gap-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold group"
            onClick={closeMenu}
          >
            <div className="relative">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🎂</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-dancing text-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                Doçuras & Sabores
              </span>
              <span className="text-xs text-gray-500 font-sans">Confeitaria Artesanal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 ml-12">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-purple-600'
                  : 'text-gray-800 hover:text-purple-600'
              }`}
            >
              Início
            </Link>
            <MegaMenu />
            <Link
              to="/about"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/about'
                  ? 'text-purple-600'
                  : 'text-gray-800 hover:text-purple-600'
              }`}
            >
              Sobre Nós
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/contact'
                  ? 'text-purple-600'
                  : 'text-gray-800 hover:text-purple-600'
              }`}
            >
              Contato
            </Link>
            <Link
              to="/acompanhar-pedido"
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/acompanhar-pedido'
                  ? 'text-purple-600'
                  : 'text-gray-800 hover:text-purple-600'
              }`}
            >
              Acompanhar Pedido
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2 ml-auto">
            {/* Mini Cart */}
            <MiniCart />

            {/* User Menu */}
            {user ? (
              <div className="relative ml-6">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <User size={20} />
                  <span className="font-medium">Minha Área</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform -translate-x-2"
                    >
                      <Link
                        to="/minha-area"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={closeMenu}
                      >
                        <User size={16} />
                        <span>Minha Área</span>
                      </Link>
                      {/* Admin link oculto - acesso apenas via URL secreta */}
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Sair</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-purple-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-800 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Acompanhar Pedido - Destaque no mobile */}
                <Link
                  to="/acompanhar-pedido"
                  className={`block px-4 py-2 font-medium transition-colors ${
                    location.pathname === '/acompanhar-pedido'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                  onClick={closeMenu}
                >
                  📦 Acompanhar Pedido
                </Link>
                
                <div className="border-t border-gray-200 pt-4 px-4">
                  <Link
                    to="/cart"
                    className="flex items-center justify-between py-2 text-gray-800 hover:text-purple-600"
                    onClick={closeMenu}
                  >
                    <span className="font-medium">Carrinho</span>
                    <div className="flex items-center space-x-2">
                      <ShoppingCart size={20} />
                      {getTotalItems() > 0 && (
                        <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {getTotalItems()}
                        </span>
                      )}
                    </div>
                  </Link>
                 
                  {user ? (
                    <div className="space-y-2">
                      <div className="py-2 text-sm text-gray-600">
                        Olá, {user.name}!
                      </div>
                      <Link
                        to="/minha-area"
                        className="flex items-center space-x-2 py-2 text-gray-800 hover:text-purple-600"
                        onClick={closeMenu}
                      >
                        <User size={16} />
                        <span>Minha Área</span>
                      </Link>
                      {/* Admin link oculto - acesso apenas via URL secreta */}
                      <button
                        onClick={() => {
                          logout()
                          closeMenu()
                        }}
                        className="flex items-center space-x-2 py-2 text-gray-800 hover:text-purple-600 w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Sair</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="btn-primary w-full text-center"
                      onClick={closeMenu}
                    >
                      Entrar
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
