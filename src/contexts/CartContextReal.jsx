import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import logger from '../utils/logger'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Carregar carrinho do servidor
  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/cart.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Para incluir cookies
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setItems(data.items || [])
          logger.log('🛒 Carrinho carregado do servidor:', data.items)
        }
      }
    } catch (error) {
      // Backend não está rodando - usar localStorage como fallback
      // Não mostrar erro no console se for apenas conexão recusada
      if (!error.message.includes('Failed to fetch') && !error.message.includes('ERR_CONNECTION_REFUSED')) {
        logger.warn('⚠️ Erro ao carregar carrinho:', error.message)
      }
      try {
        const savedCart = localStorage.getItem('cart-items')
        if (savedCart) {
          const items = JSON.parse(savedCart)
          setItems(items)
          logger.log('🛒 Carrinho carregado do localStorage (backend offline)')
        }
      } catch (localError) {
        // Silenciar erro do localStorage
      }
    } finally {
      setLoading(false)
    }
  }

  // Adicionar item ao carrinho
  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true)
      
      const response = await fetch('http://localhost:8000/cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Recarregar carrinho do servidor
          await loadCart()
          toast.success(`${product.name} adicionado ao carrinho!`)
        }
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erro ao adicionar ao carrinho')
      }
    } catch (error) {
      // Backend não está rodando - usar localStorage como fallback
      logger.warn('⚠️ Backend não disponível, usando localStorage:', error.message)
      try {
        const currentItems = [...items]
        const existingItemIndex = currentItems.findIndex(item => item.id === product.id)
        
        if (existingItemIndex >= 0) {
          currentItems[existingItemIndex].quantity += quantity
        } else {
          currentItems.push({
            ...product,
            quantity: quantity
          })
        }
        
        setItems(currentItems)
        localStorage.setItem('cart-items', JSON.stringify(currentItems))
        toast.success(`${product.name} adicionado ao carrinho!`)
      } catch (localError) {
        logger.error('Erro ao salvar no localStorage:', localError)
        toast.error('Erro ao adicionar ao carrinho')
      }
    } finally {
      setLoading(false)
    }
  }

  // Atualizar quantidade
  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true)
      
      const response = await fetch('http://localhost:8000/cart.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Recarregar carrinho do servidor
          await loadCart()
        }
      }
    } catch (error) {
      logger.error('Erro ao atualizar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  // Remover item do carrinho
  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      
      const response = await fetch('http://localhost:8000/cart.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId,
          quantity: 0 // Quantidade 0 remove o item
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Recarregar carrinho do servidor
          await loadCart()
          toast.success('Item removido do carrinho!')
        }
      }
    } catch (error) {
      logger.error('Erro ao remover do carrinho:', error)
      toast.error('Erro ao remover do carrinho')
    } finally {
      setLoading(false)
    }
  }

  // Limpar carrinho
  const clearCart = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('http://localhost:8000/cart.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setItems([])
          logger.log('🛒 Carrinho limpo no servidor')
        }
      }
    } catch (error) {
      logger.error('Erro ao limpar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calcular totais
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  }

  // Carregar carrinho ao inicializar
  useEffect(() => {
    loadCart()
  }, [])

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartTotal: getTotalPrice, // Alias para compatibilidade
    loadCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
