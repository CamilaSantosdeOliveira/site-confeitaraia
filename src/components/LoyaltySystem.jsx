import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Star, Crown, Percent, Award, ShoppingBag } from 'lucide-react'

const LoyaltySystem = () => {
  const [userPoints, setUserPoints] = useState(1250)
  const [couponCode, setCouponCode] = useState('')
  const [activeCoupons, setActiveCoupons] = useState([])

  const userLevel = userPoints >= 2000 ? 'Diamante' : userPoints >= 1000 ? 'Ouro' : userPoints >= 500 ? 'Prata' : 'Bronze'

  const availableRewards = [
    {
      id: 1,
      name: 'Cupom 10% OFF',
      description: 'Desconto de 10% em qualquer pedido',
      pointsCost: 500,
      type: 'discount',
      value: 10,
      icon: Percent
    },
    {
      id: 2,
      name: 'Bolo Gratuito',
      description: 'Bolo pequeno de qualquer sabor',
      pointsCost: 1000,
      type: 'free_product',
      value: 'Bolo Pequeno',
      icon: Gift
    },
    {
      id: 3,
      name: 'Entrega Grátis',
      description: 'Entrega gratuita por 30 dias',
      pointsCost: 750,
      type: 'free_shipping',
      value: '30 dias',
      icon: ShoppingBag
    },
    {
      id: 4,
      name: 'Cupom 20% OFF',
      description: 'Desconto de 20% em pedidos acima de R$ 100',
      pointsCost: 1500,
      type: 'discount',
      value: 20,
      icon: Percent
    }
  ]

  const availableCoupons = [
    {
      code: 'BEMVINDO10',
      description: '10% OFF para novos clientes',
      discount: 10,
      minValue: 0,
      validUntil: '2024-12-31',
      usageLimit: 1
    },
    {
      code: 'ANIVERSARIO15',
      description: '15% OFF no seu aniversário',
      discount: 15,
      minValue: 50,
      validUntil: '2024-12-31',
      usageLimit: 1
    },
    {
      code: 'FREEGRATIS',
      description: 'Entrega grátis em pedidos acima de R$ 80',
      discount: 0,
      minValue: 80,
      validUntil: '2024-12-31',
      usageLimit: 3,
      freeShipping: true
    }
  ]

  const redeemReward = (reward) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints(userPoints - reward.pointsCost)
      setActiveCoupons([...activeCoupons, {
        ...reward,
        code: `REWARD${reward.id}`,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }])
      alert(`Recompensa "${reward.name}" resgatada com sucesso!`)
    } else {
      alert('Pontos insuficientes para resgatar esta recompensa.')
    }
  }

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase())
    if (coupon) {
      if (!activeCoupons.find(ac => ac.code === coupon.code)) {
        setActiveCoupons([...activeCoupons, coupon])
        setCouponCode('')
        alert(`Cupom "${coupon.code}" aplicado com sucesso!`)
      } else {
        alert('Este cupom já foi aplicado.')
      }
    } else {
      alert('Cupom inválido ou expirado.')
    }
  }

  const removeCoupon = (couponCode) => {
    setActiveCoupons(activeCoupons.filter(c => c.code !== couponCode))
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Programa de Fidelidade
        </h1>
        <p className="text-gray-600">
          Ganhe pontos e aproveite benefícios exclusivos
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* User Status */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Nível {userLevel}</h2>
              <p className="text-purple-100">{userPoints} pontos</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progresso</span>
                  <span>{userPoints}/2000</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((userPoints / 2000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  <span>R$ 1 = 1 ponto</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Pontos não expiram</span>
                </div>
                <div className="flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  <span>Resgate recompensas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Coupons */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Cupons Disponíveis</h3>
            
            <div className="space-y-3">
              {availableCoupons.map(coupon => (
                <div key={coupon.code} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-purple-600">{coupon.code}</div>
                      <div className="text-sm text-gray-600">{coupon.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {coupon.freeShipping ? 'Frete Grátis' : `${coupon.discount}% OFF`}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Mínimo: R$ {coupon.minValue.toFixed(2)} | Válido até: {coupon.validUntil}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Digite o código do cupom"
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Resgate suas Recompensas</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {availableRewards.map(reward => {
                const IconComponent = reward.icon
                return (
                  <div key={reward.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className="w-6 h-6 text-purple-600 mr-2" />
                        <div>
                          <h4 className="font-semibold">{reward.name}</h4>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{reward.pointsCost} pts</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => redeemReward(reward)}
                      disabled={userPoints < reward.pointsCost}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                        userPoints >= reward.pointsCost
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userPoints >= reward.pointsCost ? 'Resgatar' : 'Pontos Insuficientes'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Coupons */}
          {activeCoupons.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
              <h3 className="text-xl font-bold mb-6">Cupons Ativos</h3>
              
              <div className="space-y-3">
                {activeCoupons.map(coupon => (
                  <motion.div
                    key={coupon.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-green-700">{coupon.code}</div>
                        <div className="text-sm text-green-600">
                          {coupon.freeShipping ? 'Frete Grátis' : `${coupon.discount}% OFF`}
                        </div>
                        {coupon.description && (
                          <div className="text-xs text-gray-600 mt-1">{coupon.description}</div>
                        )}
                      </div>
                      <button
                        onClick={() => removeCoupon(coupon.code)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* How to Earn Points */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
            <h3 className="text-xl font-bold mb-6">Como Ganhar Pontos</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold">Compras</div>
                  <div className="text-sm text-gray-600">R$ 1 = 1 ponto</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <Star className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold">Avaliações</div>
                  <div className="text-sm text-gray-600">50 pontos por avaliação</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <Gift className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold">Aniversário</div>
                  <div className="text-sm text-gray-600">200 pontos extras</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold">Indicações</div>
                  <div className="text-sm text-gray-600">100 pontos por amigo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoyaltySystem












