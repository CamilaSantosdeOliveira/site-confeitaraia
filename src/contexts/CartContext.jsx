import { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }

    case 'SET_CART':
      return {
        ...state,
        items: action.payload
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  })

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('confeitaria-cart')
    console.log('🛒 CartContext - Carrinho salvo:', savedCart)
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        console.log('🛒 CartContext - Dados carregados:', cartData)
        dispatch({ type: 'SET_CART', payload: cartData })
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      }
    } else {
      console.log('🛒 CartContext - Nenhum carrinho salvo encontrado')
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('confeitaria-cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product, quantity = 1) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      category: product.category
    }
    
    console.log('🛒 CartContext - Adicionando produto:', item)
    
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    toast.success('Item removido do carrinho!')
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast.success('Carrinho limpo!')
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getItemQuantity
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

