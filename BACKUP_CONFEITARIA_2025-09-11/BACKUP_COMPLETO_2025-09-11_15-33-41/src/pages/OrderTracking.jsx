import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

const OrderTracking = () => {
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-dancing font-bold text-gray-800 mb-4">
            Rastrear Pedido
          </h1>
          <p className="text-gray-600">
            Acompanhe o status do seu pedido em tempo real
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="mb-6">
            <input
              type="text"
              placeholder="Digite o número do seu pedido"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors font-semibold">
            Rastrear Pedido
          </button>
        </motion.div>

        {/* Exemplo de rastreamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Pedido #12345
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Pedido Confirmado</h4>
                <p className="text-gray-600">Seu pedido foi confirmado e está sendo preparado</p>
                <p className="text-sm text-gray-500">Hoje às 14:30</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Em Preparação</h4>
                <p className="text-gray-600">Seus doces estão sendo preparados com carinho</p>
                <p className="text-sm text-gray-500">Hoje às 15:00</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Saiu para Entrega</h4>
                <p className="text-gray-600">Seu pedido está a caminho</p>
                <p className="text-sm text-gray-500">Hoje às 16:30</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 opacity-50">
              <div className="bg-gray-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-400">Entregue</h4>
                <p className="text-gray-400">Pedido entregue com sucesso</p>
                <p className="text-sm text-gray-400">Aguardando entrega</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderTracking

