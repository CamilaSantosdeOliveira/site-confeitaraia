import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, CreditCard, Truck } from 'lucide-react'

const OrderSystem = () => {
  const [step, setStep] = useState(1)
  const [orderData, setOrderData] = useState({
    deliveryType: 'delivery',
    date: '',
    time: '',
    address: '',
    phone: '',
    paymentMethod: 'pix',
    specialInstructions: ''
  })

  const deliveryTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-20 h-1 mx-2 ${
                  step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Entrega</span>
          <span>Data/Hora</span>
          <span>Pagamento</span>
          <span>Confirmação</span>
        </div>
      </div>

      {/* Step 1: Delivery Type */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Como você prefere receber?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => setOrderData({...orderData, deliveryType: 'delivery'})}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                orderData.deliveryType === 'delivery' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <Truck className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega em Casa</h3>
              <p className="text-gray-600 mb-4">Receba no conforto da sua casa</p>
              <div className="text-sm text-gray-500">
                <p>• Entrega em até 2 horas</p>
                <p>• Taxa de entrega: R$ 8,00</p>
                <p>• Grátis para pedidos acima de R$ 50,00</p>
              </div>
            </div>

            <div
              onClick={() => setOrderData({...orderData, deliveryType: 'pickup'})}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                orderData.deliveryType === 'pickup' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <MapPin className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Retirar na Loja</h3>
              <p className="text-gray-600 mb-4">Venha buscar na nossa confeitaria</p>
              <div className="text-sm text-gray-500">
                <p>• Sem taxa de entrega</p>
                <p>• Retirada em 30 minutos</p>
                <p>• Horário: 09h às 20h</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!orderData.deliveryType}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            Continuar
          </button>
        </motion.div>
      )}

      {/* Step 2: Date and Time */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Escolha a Data e Hora</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold mb-3">Data da Entrega</label>
              <input
                type="date"
                value={orderData.date}
                onChange={(e) => setOrderData({...orderData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Horário Preferido</label>
              <select
                value={orderData.time}
                onChange={(e) => setOrderData({...orderData, time: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione um horário</option>
                {deliveryTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {orderData.deliveryType === 'delivery' && (
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-3">Endereço de Entrega</label>
              <textarea
                value={orderData.address}
                onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                placeholder="Digite seu endereço completo..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-3">Telefone para Contato</label>
            <input
              type="tel"
              value={orderData.phone}
              onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
              placeholder="(11) 99999-9999"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-300 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!orderData.date || !orderData.time || !orderData.phone}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Forma de Pagamento</h2>
          
          <div className="space-y-4">
            {[
              { id: 'pix', name: 'PIX', icon: '💳', description: 'Pagamento instantâneo' },
              { id: 'credit', name: 'Cartão de Crédito', icon: '💳', description: 'Visa, Mastercard, Elo' },
              { id: 'debit', name: 'Cartão de Débito', icon: '💳', description: 'Débito automático' },
              { id: 'cash', name: 'Dinheiro', icon: '💰', description: 'Pagamento na entrega' }
            ].map(method => (
              <div
                key={method.id}
                onClick={() => setOrderData({...orderData, paymentMethod: method.id})}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  orderData.paymentMethod === method.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{method.icon}</span>
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-3">Instruções Especiais</label>
            <textarea
              value={orderData.specialInstructions}
              onChange={(e) => setOrderData({...orderData, specialInstructions: e.target.value})}
              placeholder="Alguma observação especial? (opcional)"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-300 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!orderData.paymentMethod}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Confirme seu Pedido</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Resumo do Pedido</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Tipo:</strong> {orderData.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}</p>
              <p><strong>Data:</strong> {orderData.date}</p>
              <p><strong>Horário:</strong> {orderData.time}</p>
              {orderData.deliveryType === 'delivery' && (
                <p><strong>Endereço:</strong> {orderData.address}</p>
              )}
              <p><strong>Telefone:</strong> {orderData.phone}</p>
              <p><strong>Pagamento:</strong> {orderData.paymentMethod}</p>
              {orderData.specialInstructions && (
                <p><strong>Observações:</strong> {orderData.specialInstructions}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-300 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={() => {
                // Aqui seria enviado para o backend
                console.log('Pedido confirmado:', orderData)
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all"
            >
              Confirmar Pedido
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OrderSystem

