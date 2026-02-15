import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, AlertCircle, CheckCircle, Truck, MapPin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContextReal'
import { useState } from 'react'
import BackButton from '../components/BackButton'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [cep, setCep] = useState('')
  const [shippingInfo, setShippingInfo] = useState(null)
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/checkout')
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      setShowClearConfirm(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
    }
  }

      const calculateShipping = async () => {
        if (!cep || cep.length !== 8) {
          alert('Por favor, digite um CEP válido (8 dígitos)')
          return
        }

        setIsCalculatingShipping(true)
        
        try {
          // Simulação de cálculo de frete (você pode integrar com APIs reais como ViaCEP, Correios, etc.)
          await new Promise(resolve => setTimeout(resolve, 1500)) // Simula delay da API
          
          // Dados simulados baseados no CEP
          // CEPs de São Paulo (01-05, 08) = frete grátis
          // Outros CEPs = R$ 15,90
          const isSaoPaulo = cep.startsWith('01') || cep.startsWith('02') || cep.startsWith('03') || 
                           cep.startsWith('04') || cep.startsWith('05') || cep.startsWith('08')
          
          const mockShippingData = {
            cep: cep,
            deliveryTime: '2-3 dias úteis',
            cost: isSaoPaulo ? 0 : 15.90,
            freeShipping: isSaoPaulo,
            city: isSaoPaulo ? 'São Paulo' : 'Rio de Janeiro',
            state: isSaoPaulo ? 'SP' : 'RJ'
          }
          
          setShippingInfo(mockShippingData)
        } catch (error) {
          console.error('Erro ao calcular frete:', error)
          alert('Erro ao calcular frete. Tente novamente.')
        } finally {
          setIsCalculatingShipping(false)
        }
      }

  const formatCep = (value) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    // Limita a 8 dígitos
    return numbers.slice(0, 8)
  }

      const handleCepChange = (e) => {
        const formattedCep = formatCep(e.target.value)
        setCep(formattedCep)
        // Limpa informações de frete quando CEP muda
        if (shippingInfo && shippingInfo.cep !== formattedCep) {
          setShippingInfo(null)
        }
      }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-dancing font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione alguns produtos deliciosos ao seu carrinho!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver Produtos
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <BackButton to="/menu" text="Voltar ao Cardápio" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800">
                Seu Carrinho
              </h1>
              <p className="text-gray-600 mt-2">
                {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
              </p>
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.category}
                      </p>
                      <div className="text-2xl font-bold text-pink-600">
                        R$ {parseFloat(item.price).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800 mb-2">
                        R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                  <span>R$ {getCartTotal().toFixed(2)}</span>
                </div>
                
                {/* Campo de Cálculo de Frete */}
                <div className="border-t pt-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Calcular Frete
                      {!shippingInfo && (
                        <span className="text-orange-600 text-xs ml-2">(Recomendado)</span>
                      )}
                    </label>
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="00000-000"
                        className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                        maxLength={8}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          calculateShipping()
                        }}
                        disabled={isCalculatingShipping || cep.length !== 8}
                        className="px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0"
                        title={cep.length !== 8 ? 'Digite um CEP válido (8 dígitos)' : 'Calcular frete'}
                      >
                        {isCalculatingShipping ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="hidden sm:inline">...</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-4 h-4" />
                            <span className="hidden sm:inline">Calcular</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                  </div>

                  {/* Informações do Frete */}
                  {shippingInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Frete para {shippingInfo.city}, {shippingInfo.state}
                        </span>
                      </div>
                      <div className="text-sm text-green-700">
                        <div className="flex justify-between">
                          <span>Entrega:</span>
                          <span className="font-medium">{shippingInfo.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valor:</span>
                          <span className="font-medium">
                            {shippingInfo.freeShipping ? (
                              <span className="text-green-600">Grátis</span>
                            ) : (
                              `R$ ${shippingInfo.cost.toFixed(2)}`
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>
                  <span className={shippingInfo ? (shippingInfo.freeShipping ? "text-green-600" : "text-gray-600") : "text-orange-600"}>
                    {shippingInfo ? (shippingInfo.freeShipping ? "Grátis" : `R$ ${shippingInfo.cost.toFixed(2)}`) : "Calcule o frete"}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className={shippingInfo ? "text-gray-800" : "text-orange-600"}>
                      {shippingInfo ? 
                        `R$ ${(getCartTotal() + (shippingInfo.freeShipping ? 0 : shippingInfo.cost)).toFixed(2)}` : 
                        `R$ ${getCartTotal().toFixed(2)} + frete`
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Botão principal */}
                <Link
                  to="/checkout-payment"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center font-semibold block"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">💳</span>
                    <span>FINALIZAR COMPRA</span>
                  </div>
                </Link>
                
                {/* Botão secundário */}
                <Link
                  to="/menu"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors text-center font-medium block border border-gray-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🍰</span>
                    <span>CONTINUAR COMPRANDO</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-800">Limpar Carrinho</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja remover todos os itens do carrinho? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Ação realizada com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Cart
