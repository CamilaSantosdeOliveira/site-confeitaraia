import { memo, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

// Lazy loading para componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Memoização para evitar re-renders desnecessários
export const OptimizedProductCard = memo(({ product, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full"
          >
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  )
})

// Virtualização para listas grandes
export const VirtualizedProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <OptimizedProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// Intersection Observer para lazy loading de imagens
export const LazyImage = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onLoad={(e) => {
        e.target.classList.add('loaded')
      }}
    />
  )
}

// Debounce hook para otimizar pesquisas
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Service Worker para cache
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  }
}

