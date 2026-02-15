import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, QrCode, FileText, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import paymentService from '../services/paymentService'

const PaymentSystem = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentData, setPaymentData] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [pixCode, setPixCode] = useState('')
  const [pixExpiration, setPixExpiration] = useState(null)
  const [boletoCode, setBoletoCode] = useState('')
  const [boletoExpiration, setBoletoExpiration] = useState(null)

  const orderTotal = 125.50
  const installments = [1, 2, 3, 6, 12]

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: QrCode,
      color: 'from-green-500 to-emerald-600',
      processingTime: 'Imediato'
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Elo, Hipercard',
      icon: CreditCard,
      color: 'from-blue-500 to-indigo-600',
      processingTime: 'Imediato'
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      description: 'Débito automático',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-600',
      processingTime: 'Imediato'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Pagamento em até 3 dias úteis',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      processingTime: '3 dias úteis'
    }
  ]

  const generatePixCode = async () => {
    try {
      const result = await paymentService.generatePix(orderTotal, 'Pedido Doçuras & Sabores')
      if (result.success) {
        setPixCode(result.pix.qrCode)
        setPixExpiration(result.pix.expiration)
      }
    } catch (error) {
      console.error('Erro ao gerar PIX:', error)
      // Fallback para código mock
      const code = '00020126580014br.gov.bcb.pix0136' + 
                  Math.random().toString(36).substring(2, 15) + 
                  '520400005303986540599.905802BR5913Doçuras Sabores6008São Paulo62070503***6304'
      setPixCode(code)
      setPixExpiration(new Date(Date.now() + 30 * 60 * 1000))
    }
  }

  const generateBoletoCode = async () => {
    try {
      const result = await paymentService.generateBoleto(orderTotal, {
        name: 'Cliente Doçuras & Sabores',
        email: 'cliente@exemplo.com'
      })
      if (result.success) {
        setBoletoCode(result.boleto.code)
        setBoletoExpiration(result.boleto.expiration)
      }
    } catch (error) {
      console.error('Erro ao gerar boleto:', error)
      // Fallback para código mock
      const code = '23793.38128 60047.173306 00000.063105 9 84410026000'
      setBoletoCode(code)
      setBoletoExpiration(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))
    }
  }

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method.id)
    setPaymentData({})
    setPaymentStatus(null)
    
    if (method.id === 'pix') {
      generatePixCode()
    } else if (method.id === 'boleto') {
      generateBoletoCode()
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)
    
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simulação de sucesso (90% de chance)
    const success = Math.random() > 0.1
    
    if (success) {
      setPaymentStatus('success')
    } else {
      setPaymentStatus('error')
    }
    
    setIsProcessing(false)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const calculateInstallment = (installmentCount) => {
    if (installmentCount === 1) return orderTotal
    const interest = installmentCount <= 3 ? 0 : 0.0199 // 1.99% ao mês
    const totalWithInterest = orderTotal * Math.pow(1 + interest, installmentCount)
    return totalWithInterest / installmentCount
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Finalizar Pagamento
        </h1>
        <p className="text-gray-600">
          Escolha a forma de pagamento mais conveniente
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Forma de Pagamento</h2>
            
            <div className="space-y-4">
              {paymentMethods.map(method => {
                const IconComponent = method.icon
                return (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        <p className="text-xs text-gray-500">Processamento: {method.processingTime}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Dados do Pagamento</h3>
              
              {paymentMethod === 'pix' && (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4">
                    <QrCode className="w-32 h-32 mx-auto text-gray-600 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code com seu app bancário</p>
                    <div className="bg-white p-3 rounded border text-xs font-mono break-all">
                      {pixCode}
                    </div>
                  </div>
                  {pixExpiration && (
                    <p className="text-sm text-gray-500">
                      Expira em: {pixExpiration.toLocaleTimeString('pt-BR')}
                    </p>
                  )}
                </div>
              )}

              {paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="Nome como está no cartão"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Parcelas</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      {installments.map(installment => (
                        <option key={installment} value={installment}>
                          {installment}x de {formatCurrency(calculateInstallment(installment))}
                          {installment > 1 && installment <= 3 ? ' (sem juros)' : ''}
                          {installment > 3 ? ' (com juros)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === 'debit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Senha</label>
                    <input
                      type="password"
                      placeholder="Digite sua senha"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4">
                    <FileText className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Boleto gerado com sucesso</p>
                    <div className="bg-white p-3 rounded border text-xs font-mono">
                      {boletoCode}
                    </div>
                  </div>
                  {boletoExpiration && (
                    <p className="text-sm text-gray-500">
                      Vencimento: {boletoExpiration.toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
                    Imprimir Boleto
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">Pagamento Seguro</h3>
            </div>
            <div className="text-sm text-green-700 space-y-2">
              <p>• Dados criptografados com SSL</p>
              <p>• Integração com Mercado Pago</p>
              <p>• Conformidade com LGPD</p>
              <p>• Proteção contra fraudes</p>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-6 ${
                paymentStatus === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center">
                {paymentStatus === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    paymentStatus === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {paymentStatus === 'success' ? 'Pagamento Aprovado!' : 'Erro no Pagamento'}
                  </h3>
                  <p className={`text-sm ${
                    paymentStatus === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {paymentStatus === 'success' 
                      ? 'Seu pedido foi confirmado e será processado em breve.' 
                      : 'Ocorreu um erro ao processar o pagamento. Tente novamente.'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Button */}
          {paymentMethod && !paymentStatus && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={processPayment}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Processando Pagamento...
                </div>
              ) : (
                `Pagar ${formatCurrency(orderTotal)}`
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Informações dos Meios de Pagamento</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Cartão de Crédito</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Aceitamos: Visa, Mastercard, Elo, Hipercard</p>
              <p>• Parcelamento em até 12x</p>
              <p>• Juros de 1.99% ao mês a partir da 4ª parcela</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">PIX</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Pagamento instantâneo</p>
              <p>• Disponível 24h por dia</p>
              <p>• Sem taxas adicionais</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Boleto Bancário</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Vencimento em 3 dias úteis</p>
              <p>• Aceito em qualquer banco</p>
              <p>• Confirmação em até 1 dia útil</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Cartão de Débito</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Débito automático na conta</p>
              <p>• Disponível para cartões nacionais</p>
              <p>• Processamento imediato</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSystem
