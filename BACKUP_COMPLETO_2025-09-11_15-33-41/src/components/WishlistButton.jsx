import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, HeartOff } from 'lucide-react'

const WishlistButton = ({ productId, productName, onToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    setIsAnimating(true)
    setIsWishlisted(!isWishlisted)
    
    if (onToggle) {
      onToggle(productId, !isWishlisted)
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isWishlisted 
          ? 'bg-red-500 text-white shadow-lg' 
          : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-md'
      }`}
      disabled={isAnimating}
    >
      <AnimatePresence mode="wait">
        {isWishlisted ? (
          <motion.div
            key="filled"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Heart size={20} fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div
            key="outline"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Heart size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse effect when adding to wishlist */}
      <AnimatePresence>
        {isAnimating && isWishlisted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-red-500 rounded-full"
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      </div>
    </motion.button>
  )
}

export default WishlistButton

