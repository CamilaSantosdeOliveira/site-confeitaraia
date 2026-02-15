import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  ShoppingCart, 
  Heart, 
  Star,
  Bell,
  Gift
} from 'lucide-react'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const success = (title, message, duration = 5000) => {
    return addNotification({ type: 'success', title, message, duration })
  }

  const error = (title, message, duration = 7000) => {
    return addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title, message, duration = 6000) => {
    return addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title, message, duration = 5000) => {
    return addNotification({ type: 'info', title, message, duration })
  }

  const cart = (title, message, duration = 4000) => {
    return addNotification({ type: 'cart', title, message, duration })
  }

  const wishlist = (title, message, duration = 4000) => {
    return addNotification({ type: 'wishlist', title, message, duration })
  }

  const promotion = (title, message, duration = 8000) => {
    return addNotification({ type: 'promotion', title, message, duration })
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    cart,
    wishlist,
    promotion
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <AlertCircle size={20} />
      case 'warning':
        return <AlertCircle size={20} />
      case 'info':
        return <Info size={20} />
      case 'cart':
        return <ShoppingCart size={20} />
      case 'wishlist':
        return <Heart size={20} />
      case 'promotion':
        return <Gift size={20} />
      default:
        return <Bell size={20} />
    }
  }

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500',
          title: 'text-green-800',
          message: 'text-green-700'
        }
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-500',
          title: 'text-red-800',
          message: 'text-red-700'
        }
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-500',
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        }
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-500',
          title: 'text-blue-800',
          message: 'text-blue-700'
        }
      case 'cart':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-500',
          title: 'text-purple-800',
          message: 'text-purple-700'
        }
      case 'wishlist':
        return {
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          icon: 'text-pink-500',
          title: 'text-pink-800',
          message: 'text-pink-700'
        }
      case 'promotion':
        return {
          bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
          border: 'border-purple-200',
          icon: 'text-purple-500',
          title: 'text-purple-800',
          message: 'text-purple-700'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-800',
          message: 'text-gray-700'
        }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => {
          const colors = getColors(notification.type)
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`max-w-sm w-full ${colors.bg} ${colors.border} border rounded-xl shadow-lg backdrop-blur-sm`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${colors.icon}`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {notification.title && (
                      <h4 className={`text-sm font-semibold ${colors.title} mb-1`}>
                        {notification.title}
                      </h4>
                    )}
                    {notification.message && (
                      <p className={`text-sm ${colors.message}`}>
                        {notification.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default NotificationProvider

