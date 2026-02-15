import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../components/Header'

// Mock dos contextos
jest.mock('../contexts/CartContext', () => ({
  useCart: () => ({
    getCartCount: jest.fn(() => 0)
  })
}))

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
    isAdmin: jest.fn(() => false)
  })
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  test('renders logo and navigation', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText('Doçuras & Sabores')).toBeInTheDocument()
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument()
    expect(screen.getByText('Contato')).toBeInTheDocument()
  })

  test('toggles mobile menu when hamburger is clicked', () => {
    renderWithRouter(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
    
    expect(screen.getByText('Cardápio')).toBeInTheDocument()
  })

  test('shows login button when user is not authenticated', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText('Entrar')).toBeInTheDocument()
  })
})












