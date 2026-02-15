import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const breadcrumbMap = {
    menu: 'Cardápio',
    about: 'Sobre Nós',
    contact: 'Contato',
    cart: 'Carrinho',
    checkout: 'Finalizar Compra',
    admin: 'Administração',
    order: 'Acompanhar Pedido'
  }

  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
    const isLast = index === pathnames.length - 1
    const displayName = breadcrumbMap[name] || name

    return {
      name: displayName,
      route: routeTo,
      isLast
    }
  })

  // Não mostrar Breadcrumbs nas rotas de admin
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/painel-admin-secreto')) {
    return null
  }

  if (breadcrumbs.length === 0 || location.pathname === '/') return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            to="/"
            className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Home size={16} />
            <span>Início</span>
          </Link>
          
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.route} className="flex items-center space-x-2">
              <ChevronRight size={16} className="text-gray-300" />
              {breadcrumb.isLast ? (
                <span className="text-purple-600 font-medium">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.route}
                  className="text-gray-500 hover:text-purple-600 transition-colors"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

export default Breadcrumbs
