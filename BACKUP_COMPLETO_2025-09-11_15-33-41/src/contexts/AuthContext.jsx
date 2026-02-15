import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'

const AuthContext = createContext()

// Dados mockados para demonstração
const mockUsers = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@confeitaria.com',
    password: 'admin123',
    role: 'admin',
    phone: '(11) 99999-9999'
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    role: 'user',
    phone: '(11) 88888-8888'
  }
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token')
      if (token) {
        // Verificar se é um token mockado
        const userData = JSON.parse(localStorage.getItem('user-data'))
        if (userData) {
          setUser(userData)
        } else {
          localStorage.removeItem('auth-token')
        }
      }
    } catch (error) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user-data')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Buscar usuário mockado
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (user) {
        // Criar token mockado
        const token = `mock-token-${Date.now()}`
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        }
        
        localStorage.setItem('auth-token', token)
        localStorage.setItem('user-data', JSON.stringify(userData))
        
        setUser(userData)
        toast.success('Login realizado com sucesso!')
        
        if (user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
        
        return true
      } else {
        toast.error('Email ou senha incorretos!')
        return false
      }
    } catch (error) {
      toast.error('Erro ao fazer login')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar se email já existe
      const existingUser = mockUsers.find(u => u.email === userData.email)
      if (existingUser) {
        toast.error('Este email já está em uso!')
        return false
      }
      
      // Criar novo usuário mockado
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'user',
        phone: userData.phone
      }
      
      // Adicionar à lista mockada (em memória)
      mockUsers.push(newUser)
      
      // Fazer login automático
      const token = `mock-token-${Date.now()}`
      const userInfo = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone
      }
      
      localStorage.setItem('auth-token', token)
      localStorage.setItem('user-data', JSON.stringify(userInfo))
      
      setUser(userInfo)
      toast.success('Conta criada com sucesso!')
      navigate('/')
      
      return true
    } catch (error) {
      toast.error('Erro ao criar conta')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
    setUser(null)
    toast.success('Logout realizado com sucesso!')
    navigate('/')
  }

  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Atualizar dados do usuário
      const updatedUser = { ...user, ...profileData }
      setUser(updatedUser)
      
      // Atualizar no localStorage
      localStorage.setItem('user-data', JSON.stringify(updatedUser))
      
      toast.success('Perfil atualizado com sucesso!')
      return true
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
      return false
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar senha atual (mockado)
      if (currentPassword === 'admin123' || currentPassword === '123456') {
        toast.success('Senha alterada com sucesso!')
        return true
      } else {
        toast.error('Senha atual incorreta!')
        return false
      }
    } catch (error) {
      toast.error('Erro ao alterar senha')
      return false
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const isAuthenticated = () => {
    return !!user
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAdmin,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
