import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve inicializar sem usuário logado', () => {
    const TestComponent = () => {
      const { user, isAuthenticated } = useAuth()
      return (
        <div>
          <div data-testid="user">{user ? 'logged' : 'not-logged'}</div>
          <div data-testid="auth">{isAuthenticated ? 'true' : 'false'}</div>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user').textContent).toBe('not-logged')
    expect(screen.getByTestId('auth').textContent).toBe('false')
  })

  it('deve fazer login com credenciais válidas', async () => {
    const TestComponent = () => {
      const { login, user, isAuthenticated } = useAuth()
      
      const handleLogin = async () => {
        await login('admin@docuras.com', 'admin123')
      }
      
      return (
        <div>
          <button onClick={handleLogin}>Login</button>
          <div data-testid="user">{user ? user.email : 'not-logged'}</div>
          <div data-testid="auth">{isAuthenticated ? 'true' : 'false'}</div>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const button = screen.getByText('Login')
    button.click()

    await new Promise(resolve => setTimeout(resolve, 500))

    expect(screen.getByTestId('auth').textContent).toBe('true')
  })

  it('deve fazer logout corretamente', async () => {
    const TestComponent = () => {
      const { logout, isAuthenticated } = useAuth()
      
      return (
        <div>
          <button onClick={logout}>Logout</button>
          <div data-testid="auth">{isAuthenticated ? 'true' : 'false'}</div>
        </div>
      )
    }

    // Simular usuário logado
    localStorage.setItem('auth-token', 'test-token')
    localStorage.setItem('user-data', JSON.stringify({
      id: 1,
      email: 'test@test.com',
      name: 'Test User'
    }))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const button = screen.getByText('Logout')
    button.click()

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(screen.getByTestId('auth').textContent).toBe('false')
    expect(localStorage.getItem('auth-token')).toBeNull()
  })
})




