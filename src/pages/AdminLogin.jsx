import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Shield, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: 'admin@docuras.com', // Email pré-preenchido para acesso rápido
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        // Aguarda o React atualizar o estado do usuário antes de navegar
        // (evita o ProtectedRoute redirecionar para /login por ver user ainda null)
        setTimeout(() => {
          navigate('/painel-admin-secreto', { replace: true })
        }, 100)
      } else {
        setError('Credenciais inválidas. Acesso negado.')
      }
    } catch (error) {
      console.error('Erro:', error)
      setError('Erro interno. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Admin */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="font-dancing text-4xl bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Painel Administrativo
            </h2>
            <p className="text-gray-600 font-sans">
              Acesso Restrito - Apenas Administradores
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-200"
            onSubmit={handleSubmit}
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 text-sm">{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail Administrativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
                  placeholder="admin@docuras.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha de Administrador
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verificando acesso...
                </div>
              ) : (
                'Acessar Painel Admin'
              )}
            </motion.button>

            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-purple-600 hover:text-purple-500 font-medium"
              >
                ← Voltar ao site
              </Link>
            </div>
          </motion.form>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 bg-red-100 border border-red-300 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="text-sm font-semibold text-red-600">
                  Acesso Restrito
                </h4>
                <p className="text-xs text-red-500 mt-1">
                  Esta área é exclusiva para administradores autorizados. 
                  Todas as tentativas de acesso são monitoradas.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLogin
