import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext()

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

      const cleanEmail = email?.trim()
      const cleanPassword = password?.trim()

      // Tentar login no backend real
      const response = await fetch('http://localhost:3001/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword
        })
      })

      const data = await response.json()

      if (data.success && data.token) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token
        }

        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('user-data', JSON.stringify(userData))

        setUser(userData)
        toast.success('Login realizado com sucesso!')

        if (data.user.role !== 'admin') {
          navigate('/')
        }
        return true
      } else {
        toast.error(data.message || 'Email ou senha incorretos')
        return false
      }

    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro ao fazer login. Verifique sua conexão.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)

      // Registrar no backend real
      const response = await fetch('http://localhost:3001/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone
        })
      })

      const data = await response.json()

      if (data.success && data.token) {
        const userInfo = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          phone: userData.phone
        }

        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('user-data', JSON.stringify(userInfo))

        setUser(userInfo)
        toast.success('Conta criada com sucesso!')
        navigate('/')

        return true
      } else {
        toast.error(data.message || 'Erro ao criar conta')
        return false
      }

    } catch (error) {
      console.error('Erro ao registrar:', error)
      toast.error('Erro ao criar conta. Verifique sua conexão.')
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
