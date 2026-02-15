import { motion } from 'framer-motion'
import { CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFinalizeOrder = async () => {
    setIsProcessing(true)
    
    try {
      // Simulação de processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Limpar carrinho após sucesso
      clearCart()
      
      // Redirecionar para página de sucesso
      navigate('/order/success', { 
        state: { 
          orderId: `ORD-${Date.now()}`,
          total: getCartTotal()
        }
      })
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Redirecionar se carrinho estiver vazio
  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Truck className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-dancing font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao carrinho para continuar com a compra!
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-dancing font-bold text-gray-800 mb-4">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Complete seus dados para finalizar o pedido
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Sobrenome"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Endereço de Entrega
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="CEP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Endereço"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Número"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Complemento"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Bairro"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Cidade"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Forma de Pagamento
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" id="credit" className="text-pink-500" />
                    <label htmlFor="credit" className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" id="pix" className="text-pink-500" />
                    <label htmlFor="pix">PIX</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" id="cash" className="text-pink-500" />
                    <label htmlFor="cash">Dinheiro na Entrega</label>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Resumo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Entrega</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>R$ {getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleFinalizeOrder}
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-lg transition-colors font-semibold mt-6 flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Finalizar Pedido
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
