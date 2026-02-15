import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, MapPin, Eye, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { orderService } from '../services/orderService'

const OrderHistory = () => {
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    }
  }, [isAuthenticated])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const ordersData = await orderService.getUserOrders()
      setOrders(ordersData)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders
    .filter((o) =>
      selectedStatus === 'todos' ? true : o.status === selectedStatus
    )
    .filter((o) =>
      searchTerm.trim()
        ? String(o.order_number).toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'preparing': return <Package className="w-5 h-5 text-orange-500" />
      case 'ready': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'out_for_delivery': return <Truck className="w-5 h-5 text-purple-500" />
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'cancelled': return <Clock className="w-5 h-5 text-red-500" />
      default: return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'confirmed': return 'Confirmado'
      case 'preparing': return 'Preparando'
      case 'ready': return 'Pronto'
      case 'out_for_delivery': return 'Saiu para Entrega'
      case 'delivered': return 'Entregue'
      case 'cancelled': return 'Cancelado'
      default: return 'Desconhecido'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Acesso Negado
            </h1>
            <p className="text-gray-600 mb-8">
              Você precisa estar logado para visualizar seu histórico de pedidos.
            </p>
            <Link
              to="/login"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Meus Pedidos
              </h1>
              <p className="text-gray-600">
                Acompanhe todos os seus pedidos e seu status
              </p>
            </div>
            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
              >
                <option value="todos">Todos</option>
                <option value="confirmed">Confirmado</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Pronto</option>
                <option value="out_for_delivery">Saiu para Entrega</option>
                <option value="delivered">Entregue</option>
                <option value="pending">Pendente</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por número (ex.: ORD-123)"
                className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Você ainda não fez nenhum pedido. Que tal começar agora?
            </p>
            <Link
              to="/menu"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Ver Cardápio
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Cabeçalho compacto */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div className="space-y-0.5">
                        <h3 className="font-semibold text-gray-800">
                          #{order.order_number}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        Total: R$ {parseFloat(order.total).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Resumo */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {order.delivery_address ? 'Entrega' : 'Retirada'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {order.items_summary || 'Itens do pedido'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/order/${order.id}`}
                        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Ver detalhes
                      </Link>
                      <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Pedir novamente
                      </Link>
                    </div>
                  </div>

                  {order.delivery_date && (
                    <div className="text-sm text-gray-600">
                      <strong>Previsão de entrega:</strong> {new Date(order.delivery_date).toLocaleDateString('pt-BR')} às {order.delivery_time}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
