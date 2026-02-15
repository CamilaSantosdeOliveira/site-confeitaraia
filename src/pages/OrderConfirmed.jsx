import { motion } from 'framer-motion'
import { CheckCircle, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const OrderConfirmed = () => {
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Buscar dados do último pedido
    const lastOrder = localStorage.getItem('last-order')
    console.log('📦 Dados do localStorage:', lastOrder)
    if (lastOrder) {
      const parsedData = JSON.parse(lastOrder)
      console.log('📦 Dados parseados:', parsedData)
      setOrderData(parsedData)
    }
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Ícone de Sucesso */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Pedido Confirmado!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Seu pedido foi recebido e está sendo preparado com muito carinho!
          </motion.p>

          {/* Detalhes do Pedido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Pedido</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Número do Pedido</p>
                  <p className="text-gray-600">#{orderData?.order_number || 'ORD-2025-001'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Previsão de Entrega</p>
                  <p className="text-gray-600">Amanhã, às 14h</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Forma de Pagamento</p>
                  <p className="text-gray-600">{orderData?.payment_method || 'PIX'} - Aprovado</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Total do Pedido</p>
                  <p className="text-gray-600">R$ {orderData?.total?.toFixed(2).replace('.', ',') || '0,00'}</p>
                  {orderData?.shipping_cost > 0 && (
                    <p className="text-sm text-gray-500">
                      (Subtotal: R$ {orderData?.subtotal?.toFixed(2).replace('.', ',')} + Frete: R$ {orderData?.shipping_cost?.toFixed(2).replace('.', ',')})
                    </p>
                  )}
                  {orderData?.shipping_cost === 0 && (
                    <p className="text-sm text-green-600">
                      (Subtotal: R$ {orderData?.subtotal?.toFixed(2).replace('.', ',')} + Frete: Grátis)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Próximos Passos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-pink-50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">O que acontece agora?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <p className="text-gray-700">Seu pedido foi confirmado e está sendo preparado</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <p className="text-gray-700">Você receberá uma notificação quando sair para entrega</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <p className="text-gray-700">Nosso entregador chegará no endereço informado</p>
              </div>
            </div>
          </motion.div>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/meus-pedidos"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Acompanhar Pedido
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/menu"
              className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-colors font-semibold"
            >
              Fazer Novo Pedido
            </Link>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-gray-500"
          >
            <p>Dúvidas? Entre em contato conosco:</p>
            <p className="font-medium">(11) 3344-5566 | contato@docurasesabores.com.br</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmed
