import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContextReal'

const MiniCart = () => {
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="relative">
      {/* Botão do Carrinho - Vai direto para a página do carrinho */}
      <Link to="/cart">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
            >
              {totalItems}
            </motion.div>
          )}
        </motion.button>
      </Link>
    </div>
  )
}

export default MiniCart