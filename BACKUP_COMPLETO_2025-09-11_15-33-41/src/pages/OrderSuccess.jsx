import { motion } from 'framer-motion'
import { CheckCircle, Home, Package, Clock } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  const { orderId, total } = location.state || {}

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-dancing font-bold text-gray-800 mb-4">
            Pedido Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Seu pedido foi realizado com sucesso e está sendo preparado com muito carinho!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Número do Pedido:</span>
              <span className="font-semibold text-gray-800">{orderId || 'ORD-123456'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold text-gray-800">
                R$ {total ? total.toFixed(2) : '0.00'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmado
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Próximos Passos
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Preparação</p>
                <p className="text-sm text-gray-600">Seu pedido está sendo preparado (15-30 min)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Entrega</p>
                <p className="text-sm text-gray-600">Entregaremos no endereço informado</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          
          <p className="text-sm text-gray-500">
            Enviaremos atualizações sobre seu pedido por email e WhatsApp
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderSuccess

