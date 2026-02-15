import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, MapPin, Search, ArrowLeft, RefreshCw } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const OrderTracking = () => {
  const location = useLocation()
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Simular dados de rastreamento
  const mockOrderData = {
    id: orderId || 'ORD-123456',
    status: 'preparando',
    total: 25.00,
    items: [
      { name: 'Pudim de Leite Condensado', quantity: 1, price: 25.00 }
    ],
    customer: {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999'
    },
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo - SP',
      zipCode: '01234-567'
    },
    timeline: [
      {
        status: 'confirmado',
        title: 'Pedido Confirmado',
        description: 'Seu pedido foi recebido e confirmado',
        time: '14:30',
        completed: true
      },
      {
        status: 'preparando',
        title: 'Preparando',
        description: 'Seu pedido está sendo preparado com carinho',
        time: '14:45',
        completed: true
      },
      {
        status: 'pronto',
        title: 'Pronto para Entrega',
        description: 'Seu pedido está pronto e aguardando entrega',
        time: '15:30',
        completed: false
      },
      {
        status: 'entregue',
        title: 'Entregue',
        description: 'Seu pedido foi entregue com sucesso',
        time: '16:00',
        completed: false
      }
    ]
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) {
      setError('Por favor, digite o número do pedido')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Buscar dados reais da API
      console.log('🔍 Buscando pedido:', orderId)
      const response = await fetch(`http://localhost:8000/order_status.php?order_id=${orderId}`)
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      const data = await response.json()
      console.log('📦 Dados recebidos:', data)
      
      if (data.success) {
        setOrder({
          id: data.order.order_number,
          status: data.timeline[data.timeline.length - 1]?.status || 'confirmado',
          total: parseFloat(data.order.total),
          items: JSON.parse(data.order.items || '[]'),
          customer: {
            name: data.order.customer_name || 'Cliente',
            email: data.order.customer_email || 'cliente@exemplo.com',
            phone: data.order.customer_phone || '(11) 99999-9999'
          },
          address: {
            street: data.order.delivery_address || 'Endereço não informado',
            neighborhood: data.order.delivery_neighborhood || 'Bairro',
            city: data.order.delivery_city || 'Cidade',
            zipCode: data.order.delivery_zip || '00000-000'
          },
          timeline: data.timeline
        })
      } else {
        console.log('❌ API retornou success: false')
        console.log('❌ Erro:', data.error)
        setError(data.error || 'Erro ao buscar pedido')
      }
    } catch (error) {
      console.error('❌ Erro ao buscar pedido:', error)
      console.error('❌ Tipo do erro:', error.name)
      console.error('❌ Mensagem:', error.message)
      setError('Erro ao conectar com o servidor: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return 'bg-blue-100 text-blue-800'
      case 'preparando': return 'bg-yellow-100 text-yellow-800'
      case 'pronto': return 'bg-purple-100 text-purple-800'
      case 'entregue': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmado': return <CheckCircle className="w-5 h-5" />
      case 'preparando': return <Package className="w-5 h-5" />
      case 'pronto': return <Truck className="w-5 h-5" />
      case 'entregue': return <CheckCircle className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-6">
            Acompanhar Pedido
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Digite o número do seu pedido para acompanhar o status
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Digite o número do pedido (ex: ORD-2025-7902)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Buscar
            </button>
          </form>
          
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </motion.div>

        {/* Resultado */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Informações do Pedido */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Pedido #{order.id}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Cliente</h3>
                  <p className="text-gray-600">{order.customer.name}</p>
                  <p className="text-gray-600">{order.customer.email}</p>
                  <p className="text-gray-600">{order.customer.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Endereço de Entrega</h3>
                  <p className="text-gray-600">{order.address.street}</p>
                  <p className="text-gray-600">{order.address.neighborhood}</p>
                  <p className="text-gray-600">{order.address.city}</p>
                  <p className="text-gray-600">CEP: {order.address.zipCode}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Status do Pedido
              </h3>
              
              <div className="space-y-4">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {getStatusIcon(step.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">{step.title}</h4>
                        <span className="text-sm text-gray-500">{step.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Itens do Pedido
              </h3>
              
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Botão Voltar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderTracking