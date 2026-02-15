import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, FileText, Percent, ArrowLeft, Lock, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContextReal'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../components/NotificationSystem'
import { orderService } from '../services/orderService'
import { paymentService } from '../services/paymentService'

const Checkout = () => {
  const { items: cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const { showNotification } = useNotifications()
  const navigate = useNavigate()

  // Debug: Verificar carrinho
  console.log('🛒 Checkout - Carrinho atual:', cartItems)
  console.log('🛒 Checkout - Quantidade de itens:', cartItems?.length || 0)

  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingCost, setShippingCost] = useState(0)
  const [shippingInfo, setShippingInfo] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    complement: ''
  })

  // Cupons de desconto disponíveis
  const availableCoupons = [
    { code: 'BEMVINDO10', discount: 10, type: 'percentage', description: '10% de desconto para novos clientes' },
    { code: 'DOCE20', discount: 20, type: 'percentage', description: '20% de desconto em doces' },
    { code: 'FRETE15', discount: 15, type: 'fixed', description: 'R$ 15,00 de desconto no frete' },
    { code: 'BOLO30', discount: 30, type: 'percentage', description: '30% de desconto em bolos' }
  ]

  // Calcular totais
  const subtotal = (cartItems || []).reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  const deliveryFee = shippingCost || 0 // Sem valor padrão - só calcula quando CEP for informado
  const discount = appliedCoupon ? 
    (appliedCoupon.type === 'percentage' ? 
      (subtotal * appliedCoupon.discount / 100) : 
      appliedCoupon.discount) : 0
  const total = subtotal + deliveryFee - discount

  // Calcular frete quando CEP mudar
  useEffect(() => {
    if (deliveryAddress.zipCode && deliveryAddress.zipCode.length >= 7) {
      calculateShipping()
    }
  }, [deliveryAddress.zipCode, cartItems])

  const calculateShipping = async () => {
    try {
      // Simulação de cálculo de frete (mesma lógica do carrinho)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simula delay da API
      
      // Dados simulados baseados no CEP
      // CEPs de São Paulo (01-05, 08) = frete grátis
      // Outros CEPs = R$ 15,90
      // Só considera São Paulo se tiver 8 dígitos e começar com os códigos corretos
      const isSaoPaulo = deliveryAddress.zipCode.length === 8 && (
        deliveryAddress.zipCode.startsWith('01') || 
        deliveryAddress.zipCode.startsWith('02') || 
        deliveryAddress.zipCode.startsWith('03') || 
        deliveryAddress.zipCode.startsWith('04') || 
        deliveryAddress.zipCode.startsWith('05') || 
        deliveryAddress.zipCode.startsWith('08')
      )
      
      const shippingCost = isSaoPaulo ? 0 : 15.90
      
      setShippingCost(shippingCost)
      setShippingInfo({
        cep: deliveryAddress.zipCode,
        deliveryTime: '2-3 dias úteis',
        cost: shippingCost,
        freeShipping: isSaoPaulo,
        city: isSaoPaulo ? 'São Paulo' : 'Rio de Janeiro',
        state: isSaoPaulo ? 'SP' : 'RJ'
      })
    } catch (error) {
      console.error('Erro ao calcular frete:', error)
      setShippingCost(0) // Sem valor padrão
    }
  }

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase())
    if (coupon) {
      setAppliedCoupon(coupon)
      showNotification('Cupom aplicado com sucesso!', 'success')
    } else {
      showNotification('Cupom inválido!', 'error')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    showNotification('Cupom removido!', 'info')
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Validar se há itens no carrinho
      if (!cartItems || cartItems.length === 0) {
        throw new Error('Carrinho vazio')
      }
      
      // Validar endereço de entrega
      if (!deliveryAddress.street || !deliveryAddress.number || !deliveryAddress.neighborhood || 
          !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.zipCode) {
        throw new Error('Por favor, preencha todos os campos do endereço de entrega')
      }
      
      // Calcular total
      const subtotal = (cartItems || []).reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
      const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0
      const total = subtotal - discount
      
      if (total <= 0) {
        throw new Error('Valor total inválido')
      }
      
      // Preparar dados do pedido
      const orderData = {
        total: total,
        payment_method: getPaymentName(paymentMethod),
        delivery_address: `${deliveryAddress.street}, ${deliveryAddress.number} - ${deliveryAddress.neighborhood}, ${deliveryAddress.city}/${deliveryAddress.state} - CEP: ${deliveryAddress.zipCode}`,
        delivery_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Amanhã
        delivery_time: '14:00',
        notes: `Cupom aplicado: ${appliedCoupon?.code || 'Nenhum'}`,
        items: (cartItems || []).map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price),
          total: parseFloat(item.price) * item.quantity
        }))
      }
      
      // Debug: Verificar dados antes do envio
      console.log('📦 Dados do pedido antes do envio:', orderData)
      console.log('📦 Tipo dos dados:', typeof orderData)
      console.log('📦 JSON stringify:', JSON.stringify(orderData))
      
      // Processar pagamento
      const paymentResult = await orderService.processPayment({
        method: paymentMethod,
        amount: total,
        orderData: orderData
      })
      
      if (paymentResult.success) {
        // Criar pedido no banco de dados
        const orderResult = await orderService.createOrder(orderData)
        
        if (orderResult.success) {
          // Salvar informações do pedido para a página de confirmação
          localStorage.setItem('last-order', JSON.stringify({
            order_number: orderResult.order_number,
            order_id: orderResult.order_id,
            total: total,
            subtotal: subtotal,
            shipping_cost: deliveryFee,
            payment_method: getPaymentName(paymentMethod)
          }))
          
          clearCart()
          navigate('/pedido-confirmado')
        } else {
          throw new Error('Erro ao criar pedido')
        }
      } else {
        throw new Error('Pagamento não aprovado')
      }
      
    } catch (error) {
      console.error('Erro no pagamento:', error)
      
      // Mostrar mensagem de erro específica
      let errorMessage = '❌ Erro ao processar pagamento. Tente novamente.'
      
      if (error.message === 'Carrinho vazio') {
        errorMessage = '❌ Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.'
      } else if (error.message === 'Por favor, preencha todos os campos do endereço de entrega') {
        errorMessage = '❌ Por favor, preencha todos os campos do endereço de entrega.'
      } else if (error.message === 'Valor total inválido') {
        errorMessage = '❌ Valor total inválido. Verifique os itens do seu pedido.'
      } else if (error.message === 'Pagamento não aprovado') {
        errorMessage = '❌ Pagamento não foi aprovado. Tente novamente ou escolha outra forma de pagamento.'
      } else if (error.message === 'Erro ao criar pedido') {
        errorMessage = '❌ Erro ao criar pedido. Tente novamente.'
      } else if (error.response?.data?.error) {
        errorMessage = `❌ ${error.response.data.error}`
      }
      
      showNotification(errorMessage, 'error')
    } finally {
      setIsProcessing(false)
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

  const getPaymentName = (method) => {
    switch (method) {
      case 'pix': return 'PIX'
      case 'credit': return 'Cartão de Crédito'
      case 'boleto': return 'Boleto Bancário'
      default: return 'PIX'
    }
  }

  // Debug: verificar se cartItems está vazio
  console.log('Checkout - cartItems:', cartItems)
  console.log('Checkout - cartItems.length:', cartItems?.length)

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Carrinho Vazio</h1>
            <p className="text-gray-600 mb-8">Adicione alguns produtos ao seu carrinho para continuar.</p>
            <p className="text-red-600 mb-4">Debug: cartItems = {JSON.stringify(cartItems)}</p>
            <Link
              to="/menu"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              Ver Cardápio
            </Link>
          </motion.div>
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
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Carrinho
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Finalizar Pedido</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Checkout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Endereço de Entrega */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua/Avenida *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Rua das Flores"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.number}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, number: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.neighborhood}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, neighborhood: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Vila Madalena"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="São Paulo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="SP"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.zipCode}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="01234-567"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.complement}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, complement: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Apartamento 45, bloco A"
                  />
                </div>
              </div>
            </div>

            {/* Cupom de Desconto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-pink-500" />
                Cupom de Desconto
              </h2>
              {!appliedCoupon ? (
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Digite o código do cupom"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                  >
                    Aplicar
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-800">
                        Cupom: {appliedCoupon.code}
                      </p>
                      <p className="text-sm text-green-600">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Método de Pagamento */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de Pagamento</h2>
              <div className="space-y-3">
                {['pix', 'credit', 'boleto'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    {getPaymentIcon(method)}
                    <span className="font-medium text-gray-800">
                      {getPaymentName(method)}
                    </span>
                    {paymentMethod === method && (
                      <CheckCircle className="w-5 h-5 text-pink-500 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resumo do Pedido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              {/* Itens do Carrinho */}
              <div className="space-y-4 mb-6">
                {(cartItems || []).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de entrega</span>
                  <span>
                    {shippingInfo?.freeShipping || deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">Grátis</span>
                    ) : (
                      `R$ ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon.code})</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Botão de Finalizar */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-pink-500 text-white py-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold text-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Finalizar Pedido
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Seus dados estão protegidos com criptografia SSL
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout