import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Eye, Users, Mail, Phone, Search } from 'lucide-react'

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCustomer, setEditingCustomer] = useState(null)

  // Buscar clientes do banco MySQL
  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8081/api/customers.php')
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      // Fallback para dados mockados
      setCustomers([
        { id: 1, name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 99999-1111', address: 'Rua A, 123' },
        { id: 2, name: 'João Santos', email: 'joao@email.com', phone: '(11) 99999-2222', address: 'Rua B, 456' },
        { id: 3, name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-3333', address: 'Rua C, 789' }
      ])
    } finally {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando clientes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8 pt-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Gestão de Clientes
        </h2>
        <p className="text-xl text-gray-600">Gerencie seu cadastro de clientes</p>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar clientes por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Clientes ({filteredCustomers.length})</h3>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 inline mr-2" />
            Novo Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSave(customer.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{customer.name}</h4>
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
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300">
                      <Eye className="w-4 h-4 inline mr-1" />
                      Ver
                    </button>
                    <button 
                      onClick={() => handleEdit(customer)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
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
    </div>
  )
}

export default AdminCustomers
