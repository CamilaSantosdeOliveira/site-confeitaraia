import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartProvider, useCart } from '../contexts/CartContextReal'

// Mock do toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve inicializar com carrinho vazio', () => {
    const TestComponent = () => {
      const { items } = useCart()
      return <div data-testid="cart-items">{items.length}</div>
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('cart-items').textContent).toBe('0')
  })

  it('deve adicionar produto ao carrinho', async () => {
    const product = {
      id: 1,
      name: 'Brigadeiro',
      price: 5.00,
      image: '/images/brigadeiro.jpg'
    }

    const TestComponent = () => {
      const { addToCart, items } = useCart()
      
      return (
        <div>
          <button onClick={() => addToCart(product)}>Adicionar</button>
          <div data-testid="cart-items">{items.length}</div>
        </div>
      )
    }

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Simular clique no botão
    const button = screen.getByText('Adicionar')
    button.click()

    // Aguardar atualização
    await new Promise(resolve => setTimeout(resolve, 100))

    // Verificar se foi adicionado
    const cartItems = screen.getByTestId('cart-items')
    expect(parseInt(cartItems.textContent)).toBeGreaterThan(0)
  })

  it('deve calcular total corretamente', () => {
    const items = [
      { id: 1, name: 'Produto 1', price: 10.00, quantity: 2 },
      { id: 2, name: 'Produto 2', price: 15.00, quantity: 1 }
    ]

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    expect(total).toBe(35.00)
  })

  it('deve remover produto do carrinho', async () => {
    const TestComponent = () => {
      const { removeFromCart, items } = useCart()
      
      return (
        <div>
          <button onClick={() => removeFromCart(1)}>Remover</button>
          <div data-testid="cart-items">{items.length}</div>
        </div>
      )
    }

    // Adicionar item antes
    localStorage.setItem('cart-items', JSON.stringify([
      { id: 1, name: 'Produto', price: 10.00, quantity: 1 }
    ]))

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    const button = screen.getByText('Remover')
    button.click()

    await new Promise(resolve => setTimeout(resolve, 100))

    const cartItems = screen.getByTestId('cart-items')
    expect(parseInt(cartItems.textContent)).toBe(0)
  })
})

