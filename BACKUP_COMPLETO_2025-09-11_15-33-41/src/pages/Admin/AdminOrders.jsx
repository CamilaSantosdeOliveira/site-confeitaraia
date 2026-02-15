import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  SortAsc,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  DollarSign,
  Package,
  User,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)

  // Dados mockados para demonstração
  const mockOrders = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: {
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-1111'
      },
      items: [
        { name: 'Bolo Red Velvet', quantity: 1, price: 89.90 },
        { name: 'Cupcake Baunilha', quantity: 6, price: 18.90 }
      ],
      total: 203.40,
      status: 'completed',
      paymentMethod: 'Cartão de Crédito',
      paymentStatus: 'paid',
      createdAt: '2024-01-15T10:30:00',
      completedAt: '2024-01-15T14:00:00',
      deliveryAddress: 'Rua das Flores, 123 - São Paulo, SP',
      notes: 'Entregar após 14h'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: {
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '(11) 99999-2222'
      },
      items: [
        { name: 'Torta de Morango', quantity: 1, price: 67.50 },
        { name: 'Cupcake Chocolate', quantity: 4, price: 22.50 }
      ],
      total: 157.50,
      status: 'processing',
      paymentMethod: 'PIX',
      paymentStatus: 'paid',
      createdAt: '2024-01-15T11:15:00',
      estimatedDelivery: '2024-01-16T16:00:00',
      deliveryAddress: 'Av. Paulista, 1000 - São Paulo, SP',
      notes: 'Sem glúten'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: {
        name: 'Ana Costa',
        email: 'ana@email.com',
        phone: '(11) 99999-3333'
      },
      items: [
        { name: 'Bolo de Chocolate', quantity: 1, price: 95.00 }
      ],
      total: 95.00,
      status: 'pending',
      paymentMethod: 'Dinheiro',
      paymentStatus: 'pending',
      createdAt: '2024-01-15T12:00:00',
      deliveryAddress: 'Rua Augusta, 500 - São Paulo, SP',
      notes: 'Para aniversário'
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: {
        name: 'Pedro Lima',
        email: 'pedro@email.com',
        phone: '(11) 99999-4444'
      },
      items: [
        { name: 'Torta de Limão', quantity: 1, price: 72.00 },
        { name: 'Cupcake Morango', quantity: 8, price: 24.90 }
      ],
      total: 271.20,
      status: 'completed',
      paymentMethod: 'Cartão de Débito',
      paymentStatus: 'paid',
      createdAt: '2024-01-14T15:30:00',
      completedAt: '2024-01-14T18:00:00',
      deliveryAddress: 'Rua Oscar Freire, 200 - São Paulo, SP',
      notes: 'Decoração especial'
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: {
        name: 'Carla Ferreira',
        email: 'carla@email.com',
        phone: '(11) 99999-5555'
      },
      items: [
        { name: 'Bolo de Cenoura', quantity: 1, price: 58.00 },
        { name: 'Torta de Brigadeiro', quantity: 1, price: 78.90 }
      ],
      total: 136.90,
      status: 'cancelled',
      paymentMethod: 'Cartão de Crédito',
      paymentStatus: 'refunded',
      createdAt: '2024-01-14T09:00:00',
      cancelledAt: '2024-01-14T10:00:00',
      deliveryAddress: 'Rua Haddock Lobo, 150 - São Paulo, SP',
      notes: 'Cancelado pelo cliente'
    }
  ]

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtros e ordenação
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesDate = dateFilter === 'all' || getDateFilter(order.createdAt, dateFilter)
    return matchesSearch && matchesStatus && matchesDate
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt': return new Date(b.createdAt) - new Date(a.createdAt)
      case 'total': return b.total - a.total
      case 'status': return a.status.localeCompare(b.status)
      case 'customer': return a.customer.name.localeCompare(b.customer.name)
      default: return 0
    }
  })

  const getDateFilter = (orderDate, filter) => {
    const order = new Date(orderDate)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    switch (filter) {
      case 'today': return order >= today
      case 'yesterday': return order >= yesterday && order < today
      case 'week': return order >= weekAgo
      case 'month': return order >= monthAgo
      default: return true
    }
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Concluído'
        }
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Clock className="w-4 h-4" />,
          text: 'Processando'
        }
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Pendente'
        }
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <X className="w-4 h-4" />,
          text: 'Cancelado'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Desconhecido'
        }
    }
  }

  const getPaymentStatusInfo = (status) => {
    switch (status) {
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Pago'
        }
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'Pendente'
        }
      case 'refunded':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          text: 'Reembolsado'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          text: 'Desconhecido'
        }
    }
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const handleEditOrder = (order) => {
    setEditingOrder(order)
    setShowModal(true)
  }

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOrderStats = () => {
    const total = orders.length
    const completed = orders.filter(o => o.status === 'completed').length
    const processing = orders.filter(o => o.status === 'processing').length
    const pending = orders.filter(o => o.status === 'pending').length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)

    return { total, completed, processing, pending, cancelled, totalRevenue }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-purple-500 mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Carregando Pedidos</h3>
          <p className="text-sm text-gray-500">Preparando suas informações...</p>
        </div>
      </div>
    )
  }

  const stats = getOrderStats()

  return (
         <div className="min-h-screen bg-gray-50 p-6">
             {/* Header Principal - ESPAÇAMENTO IGUAL AO DE PRODUTOS */}
      <div className="mb-6 sm:mb-8 lg:mb-10 pt-8 sm:pt-12 lg:pt-16 xl:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Título e Descrição - Mais Espaço */}
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-800 leading-tight tracking-wide">
              Gestão de Pedidos
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Novo Pedido
            </button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Processando</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Receita Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Busca */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          </div>

          {/* Filtro de Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm appearance-none bg-white"
            >
              <option value="all">Todos os Status</option>
              <option value="completed">Concluído</option>
              <option value="processing">Processando</option>
              <option value="pending">Pendente</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Filtro de Data */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm appearance-none bg-white"
            >
              <option value="all">Todas as Datas</option>
              <option value="today">Hoje</option>
              <option value="yesterday">Ontem</option>
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
            </select>
            <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Ordenação */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm appearance-none bg-white"
            >
              <option value="createdAt">Data de Criação</option>
              <option value="total">Valor Total</option>
              <option value="status">Status</option>
              <option value="customer">Cliente</option>
            </select>
            <SortAsc className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Contador */}
          <div className="flex items-center justify-center px-4 py-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {sortedOrders.length} pedido{sortedOrders.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Pedidos Recentes</h3>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <AnimatePresence>
              {sortedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-200 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusInfo(order.status).color}`}>
                        {getStatusInfo(order.status).icon}
                        <span className="ml-1">{getStatusInfo(order.status).text}</span>
                      </span>
                      
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusInfo(order.paymentStatus).color}`}>
                        {getPaymentStatusInfo(order.paymentStatus).text}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    {/* Informações do Cliente */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Cliente
                      </h5>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">{order.customer.name}</p>
                        <p className="text-xs text-gray-600">{order.customer.email}</p>
                        <p className="text-xs text-gray-600">{order.customer.phone}</p>
                      </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Itens
                      </h5>
                      <div className="space-y-1">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between text-xs">
                            <span className="text-gray-600">{item.quantity}x {item.name}</span>
                            <span className="text-gray-900 font-medium">R$ {item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Informações de Pagamento */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Pagamento
                      </h5>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{order.paymentMethod}</p>
                        <p className="text-lg font-bold text-purple-600">R$ {order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Endereço e Notas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white rounded-lg border border-gray-100">
                    <div>
                      <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Endereço de Entrega</h6>
                      <p className="text-sm text-gray-900">{order.deliveryAddress}</p>
                    </div>
                    {order.notes && (
                      <div>
                        <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Observações</h6>
                        <p className="text-sm text-gray-900">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-white rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'processing')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-200 transition-all duration-200"
                        >
                          Iniciar Processamento
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium hover:bg-green-200 transition-all duration-200"
                        >
                          Marcar como Concluído
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium hover:bg-red-200 transition-all duration-200"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {sortedOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4 text-gray-300">🛒</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-sm text-gray-500">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes/Edição */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingOrder ? 'Editar Pedido' : 'Detalhes do Pedido'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editingOrder && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editingOrder.status}
                        onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="pending">Pendente</option>
                        <option value="processing">Processando</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status do Pagamento</label>
                      <select
                        value={editingOrder.paymentStatus}
                        onChange={(e) => setEditingOrder({...editingOrder, paymentStatus: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="pending">Pendente</option>
                        <option value="paid">Pago</option>
                        <option value="refunded">Reembolsado</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                    <textarea
                      value={editingOrder.notes || ''}
                      onChange={(e) => setEditingOrder({...editingOrder, notes: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o))
                        setShowModal(false)
                        setEditingOrder(null)
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminOrders
