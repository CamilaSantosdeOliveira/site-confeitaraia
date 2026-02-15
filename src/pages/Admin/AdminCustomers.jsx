import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Eye, Users, Mail, Phone, Search } from 'lucide-react'

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [viewingCustomer, setViewingCustomer] = useState(null)
  const timeoutRef = React.useRef(null)
  const isMountedRef = React.useRef(true)

  // Buscar clientes do banco MySQL
  useEffect(() => {
    isMountedRef.current = true
    fetchCustomers()
    
    // Cleanup quando componente desmontar
    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/customers.php')
      
      if (!response.ok) {
        throw new Error('Erro ao conectar com o banco de dados')
      }
      
      const data = await response.json()
      setCustomers(Array.isArray(data) ? data : [])
      setLoading(false)
      
      // 🔄 ATUALIZAR AUTOMATICAMENTE A CADA 30 SEGUNDOS (só se componente ainda estiver montado)
      if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchCustomers()
          }
        }, 30000)
      }
      
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      
      // 🔄 TENTAR NOVAMENTE EM 3 SEGUNDOS (RECONEXÃO AUTOMÁTICA)
      if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchCustomers()
          }
        }, 3000)
      }
      
      setLoading(false)
    }
  }

  // Filtros
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Funções de edição
  const handleEdit = (customer) => {
    setEditingCustomer({ ...customer })
  }

  const handleSave = async (customerId) => {
    try {
      // Aqui você implementaria a chamada para a API para salvar
      const updatedCustomers = customers.map(c => 
        c.id === customerId ? editingCustomer : c
      )
      setCustomers(updatedCustomers)
      setEditingCustomer(null)
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
    }
  }

  const handleCancel = () => {
    setEditingCustomer(null)
  }

  // Funções de visualização
  const handleView = (customer) => {
    setViewingCustomer(customer)
  }

  const handleCloseView = () => {
    setViewingCustomer(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando clientes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8 pt-4 sm:pt-6 lg:pt-8 xl:pt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-gray-900 mb-2">
          Gestão de Clientes
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium">
          Cadastro completo e histórico de clientes
        </p>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar clientes por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Clientes ({filteredCustomers.length})</h3>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 inline mr-2" />
            Novo Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredCustomers.map(customer => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {editingCustomer?.id === customer.id ? (
                // Modo de edição
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSave(customer.id)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                    >
                      Salvar
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo de visualização
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-gray-800">{customer.name}</h4>
                      <p className="text-sm text-gray-500">ID: {customer.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <button 
                      onClick={() => handleView(customer)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      Ver
                    </button>
                    <button 
                      onClick={() => handleEdit(customer)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Editar
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-500">Tente ajustar a busca ou adicione novos clientes</p>
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      {viewingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Detalhes do Cliente</h3>
              <button
                onClick={handleCloseView}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{viewingCustomer.name}</h4>
                <p className="text-gray-500">ID: {viewingCustomer.id}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{viewingCustomer.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium text-gray-900">{viewingCustomer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p className="font-medium text-gray-900">{viewingCustomer.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCloseView}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    handleCloseView()
                    handleEdit(viewingCustomer)
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium"
                >
                  Editar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminCustomers
