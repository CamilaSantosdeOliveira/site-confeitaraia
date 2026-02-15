import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, FileText, ArrowLeft, Lock, CheckCircle, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContextReal'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../components/NotificationSystem'
import { orderService } from '../services/orderService'
import { paymentService } from '../services/paymentService'

const CheckoutWithPayment = () => {
  const { items: cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const { error: showError, warning: showWarning, success: showSuccess } = useNotifications()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: 'SP',
    zipCode: '',
    complement: ''
  })

  // Calcular totais
  const subtotal = (cartItems || []).reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  const deliveryFee = 0 // Pode ser calculado baseado no CEP
  const total = subtotal + deliveryFee

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      showWarning('Atenção', 'Seu carrinho está vazio!')
      navigate('/cart')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems?.length, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayment = async () => {
    if (!deliveryAddress.street || !deliveryAddress.number || !deliveryAddress.neighborhood || 
        !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.zipCode) {
      showError('Erro', 'Por favor, preencha todos os campos do endereço de entrega')
      return
    }

    setIsProcessing(true)
    setPaymentStatus('processing')

    try {
      // Preparar dados do pedido
      const orderData = {
        total: total,
        payment_method: getPaymentName(paymentMethod),
        delivery_address: `${deliveryAddress.street}, ${deliveryAddress.number} - ${deliveryAddress.neighborhood}, ${deliveryAddress.city}/${deliveryAddress.state} - CEP: ${deliveryAddress.zipCode}`,
        delivery_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        delivery_time: '14:00',
        notes: deliveryAddress.complement || '',
        customer_name: user?.name || 'Cliente',
        customer_email: user?.email || '',
        customer_phone: user?.phone || '',
        items: (cartItems || []).map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price),
          total: parseFloat(item.price) * item.quantity
        }))
      }

      // Processar pagamento
      const paymentResult = await orderService.processPayment({
        method: paymentMethod,
        amount: total,
        orderData: orderData
      })

      if (paymentResult.success) {
        // Criar pedido no banco de dados
        try {
          const orderResult = await orderService.createOrder(orderData)

          if (orderResult && orderResult.success) {
            // Salvar informações do pedido
            localStorage.setItem('last-order', JSON.stringify({
              order_number: orderResult.order_number,
              order_id: orderResult.order_id,
              total: total,
              subtotal: subtotal,
              shipping_cost: deliveryFee,
              payment_method: getPaymentName(paymentMethod)
            }))

            setPaymentStatus('success')
            showSuccess('Pedido Confirmado', 'Seu pedido foi criado com sucesso!')
            clearCart()
            
            setTimeout(() => {
              navigate('/pedido-confirmado')
            }, 2000)
          } else {
            throw new Error(orderResult?.message || 'Erro ao criar pedido')
          }
        } catch (orderError) {
          console.error('Erro ao criar pedido:', orderError)
          throw new Error(orderError.message || 'Erro ao criar pedido')
        }
      } else {
        throw new Error('Pagamento não aprovado')
      }
    } catch (error) {
      console.error('Erro no pagamento:', error)
      setPaymentStatus('error')
      showError('Erro no Pagamento', 'Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getPaymentName = (method) => {
    switch (method) {
      case 'pix': return 'PIX'
      case 'credit': return 'Cartão de Crédito'
      case 'boleto': return 'Boleto Bancário'
      default: return 'PIX'
    }
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'pix': return <Smartphone className="w-6 h-6" />
      case 'credit': return <CreditCard className="w-6 h-6" />
      case 'boleto': return <FileText className="w-6 h-6" />
      default: return <CreditCard className="w-6 h-6" />
    }
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrinho vazio</h2>
          <Link to="/menu" className="text-purple-600 hover:text-purple-700">
            Voltar para o menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao carrinho
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Endereço e Pagamento */}
          <div className="lg:col-span-2 space-y-6">
            {/* Endereço de Entrega */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Endereço de Entrega</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                    <input
                      type="text"
                      name="street"
                      value={deliveryAddress.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                    <input
                      type="text"
                      name="number"
                      value={deliveryAddress.number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={deliveryAddress.neighborhood}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                    <input
                      type="text"
                      name="state"
                      value={deliveryAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={deliveryAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complemento (opcional)</label>
                  <input
                    type="text"
                    name="complement"
                    value={deliveryAddress.complement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Método de Pagamento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Método de Pagamento</h2>
              <div className="space-y-3">
                {[
                  { id: 'pix', name: 'PIX', description: 'Aprovação imediata' },
                  { id: 'credit', name: 'Cartão de Crédito', description: 'Parcelamento em até 12x' },
                  { id: 'boleto', name: 'Boleto Bancário', description: 'Vencimento em 3 dias' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      paymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getPaymentIcon(method.id)}
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || paymentStatus === 'success'}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : paymentStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Pagamento Aprovado!</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Finalizar Pedido</span>
                  </>
                )}
              </button>

              {paymentStatus === 'error' && (
                <p className="mt-4 text-sm text-red-600 text-center">
                  Erro ao processar pagamento. Tente novamente.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutWithPayment
