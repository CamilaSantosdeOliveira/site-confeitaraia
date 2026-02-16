import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Eye, Users, Mail, Phone, Search } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [viewingCustomer, setViewingCustomer] = useState(null)
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchCustomers()
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

    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
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
    if (!editingCustomer.name || !editingCustomer.email) {
      toast.error('Nome e email são obrigatórios')
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch('http://localhost:8000/manage_customer.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: customerId,
          name: editingCustomer.name,
          email: editingCustomer.email,
          phone: editingCustomer.phone || '',
          address: editingCustomer.address || ''
        })
      })

      if (response.ok) {
        toast.success('Cliente atualizado com sucesso!')
        setEditingCustomer(null)
        fetchCustomers()
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao atualizar cliente')
      }
    } catch (error) {
      toast.error(`Erro ao salvar cliente: ${error.message}`)
    } finally {
      setSubmitting(false)
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

  const openNewCustomerModal = () => {
    setShowNewCustomerModal(true)
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: ''
    })
  }

  const closeNewCustomerModal = () => {
    setShowNewCustomerModal(false)
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: ''
    })
  }

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  }

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setNewCustomer(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }))
    } else {
      setNewCustomer(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const createNewCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error('Nome e email são obrigatórios')
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch('http://localhost:8000/manage_customer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer)
      })

      if (response.ok) {
        toast.success('Cliente criado com sucesso!')
        closeNewCustomerModal()
        fetchCustomers()
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar cliente')
      }
    } catch (error) {
      toast.error(`Erro ao criar cliente: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
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
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: 999999,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            zIndex: 999999,
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
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
          <button
            onClick={openNewCustomerModal}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
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
                    value={editingCustomer.phone || ''}
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: formatPhone(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="(00) 00000-0000"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(customer.id)}
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50"
                    >
                      {submitting ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50"
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

      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Novo Cliente</h2>
                <button
                  onClick={closeNewCustomerModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleNewCustomerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleNewCustomerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleNewCustomerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <textarea
                  name="address"
                  value={newCustomer.address}
                  onChange={handleNewCustomerInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Endereço completo"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={closeNewCustomerModal}
                disabled={submitting}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={createNewCustomer}
                disabled={submitting}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Criar
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminCustomers
