import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Cake, Star, Heart, Plus, Minus } from 'lucide-react'

const CakeCustomizer = () => {
  const [customization, setCustomization] = useState({
    size: 'medium',
    flavor: 'chocolate',
    filling: 'brigadeiro',
    frosting: 'buttercream',
    decoration: 'simple',
    toppings: [],
    message: '',
    specialRequests: ''
  })

  const [totalPrice, setTotalPrice] = useState(45.00)

  const sizes = [
    { id: 'small', name: 'Pequeno', serves: '6-8 pessoas', price: 35.00 },
    { id: 'medium', name: 'Médio', serves: '10-12 pessoas', price: 45.00 },
    { id: 'large', name: 'Grande', serves: '15-20 pessoas', price: 65.00 },
    { id: 'extra-large', name: 'Extra Grande', serves: '25-30 pessoas', price: 85.00 }
  ]

  const flavors = [
    { id: 'chocolate', name: 'Chocolate', price: 0 },
    { id: 'vanilla', name: 'Baunilha', price: 0 },
    { id: 'red-velvet', name: 'Red Velvet', price: 5.00 },
    { id: 'carrot', name: 'Cenoura', price: 3.00 },
    { id: 'lemon', name: 'Limão', price: 2.00 },
    { id: 'strawberry', name: 'Morango', price: 4.00 }
  ]

  const fillings = [
    { id: 'brigadeiro', name: 'Brigadeiro', price: 0 },
    { id: 'beijinho', name: 'Beijinho', price: 0 },
    { id: 'nutella', name: 'Nutella', price: 8.00 },
    { id: 'dulce-de-leche', name: 'Doce de Leite', price: 3.00 },
    { id: 'strawberry-jam', name: 'Geléia de Morango', price: 2.00 },
    { id: 'lemon-curd', name: 'Creme de Limão', price: 4.00 }
  ]

  const frostings = [
    { id: 'buttercream', name: 'Buttercream', price: 0 },
    { id: 'ganache', name: 'Ganache', price: 5.00 },
    { id: 'whipped-cream', name: 'Creme Batido', price: 2.00 },
    { id: 'fondant', name: 'Fondant', price: 15.00 }
  ]

  const decorations = [
    { id: 'simple', name: 'Simples', price: 0 },
    { id: 'elegant', name: 'Elegante', price: 10.00 },
    { id: 'festive', name: 'Festivo', price: 15.00 },
    { id: 'luxury', name: 'Luxo', price: 25.00 }
  ]

  const availableToppings = [
    { id: 'sprinkles', name: 'Granulado', price: 2.00 },
    { id: 'chocolate-chips', name: 'Gotas de Chocolate', price: 3.00 },
    { id: 'fresh-fruits', name: 'Frutas Frescas', price: 8.00 },
    { id: 'nuts', name: 'Castanhas', price: 5.00 },
    { id: 'edible-flowers', name: 'Flores Comestíveis', price: 12.00 },
    { id: 'gold-dust', name: 'Pó Dourado', price: 15.00 }
  ]

  const calculateTotal = () => {
    let total = sizes.find(s => s.id === customization.size)?.price || 0
    total += flavors.find(f => f.id === customization.flavor)?.price || 0
    total += fillings.find(f => f.id === customization.filling)?.price || 0
    total += frostings.find(f => f.id === customization.frosting)?.price || 0
    total += decorations.find(d => d.id === customization.decoration)?.price || 0
    total += customization.toppings.reduce((sum, topping) => {
      const toppingData = availableToppings.find(t => t.id === topping)
      return sum + (toppingData?.price || 0)
    }, 0)
    return total
  }

  const handleToppingToggle = (toppingId) => {
    setCustomization(prev => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter(id => id !== toppingId)
        : [...prev.toppings, toppingId]
    }))
  }

  React.useEffect(() => {
    setTotalPrice(calculateTotal())
  }, [customization])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Personalize seu Bolo
        </h1>
        <p className="text-gray-600">
          Crie o bolo perfeito para sua ocasião especial
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Preview do seu Bolo</h2>
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-8 text-center">
            <Cake className="w-32 h-32 mx-auto text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {sizes.find(s => s.id === customization.size)?.name} - {flavors.find(f => f.id === customization.flavor)?.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {sizes.find(s => s.id === customization.size)?.serves}
            </p>
            <div className="text-2xl font-bold text-purple-600">
              R$ {totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Size Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Cake className="w-5 h-5 mr-2" />
              Tamanho do Bolo
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {sizes.map(size => (
                <div
                  key={size.id}
                  onClick={() => setCustomization({...customization, size: size.id})}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.size === size.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.serves}</div>
                  <div className="text-purple-600 font-bold">R$ {size.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Sabor da Massa</h3>
            <div className="grid grid-cols-2 gap-3">
              {flavors.map(flavor => (
                <div
                  key={flavor.id}
                  onClick={() => setCustomization({...customization, flavor: flavor.id})}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.flavor === flavor.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{flavor.name}</div>
                  {flavor.price > 0 && (
                    <div className="text-sm text-purple-600">+R$ {flavor.price.toFixed(2)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Filling Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Recheio</h3>
            <div className="grid grid-cols-2 gap-3">
              {fillings.map(filling => (
                <div
                  key={filling.id}
                  onClick={() => setCustomization({...customization, filling: filling.id})}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.filling === filling.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{filling.name}</div>
                  {filling.price > 0 && (
                    <div className="text-sm text-purple-600">+R$ {filling.price.toFixed(2)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Frosting Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cobertura</h3>
            <div className="grid grid-cols-2 gap-3">
              {frostings.map(frosting => (
                <div
                  key={frosting.id}
                  onClick={() => setCustomization({...customization, frosting: frosting.id})}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.frosting === frosting.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{frosting.name}</div>
                  {frosting.price > 0 && (
                    <div className="text-sm text-purple-600">+R$ {frosting.price.toFixed(2)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Decoration Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Decoração</h3>
            <div className="grid grid-cols-2 gap-3">
              {decorations.map(decoration => (
                <div
                  key={decoration.id}
                  onClick={() => setCustomization({...customization, decoration: decoration.id})}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.decoration === decoration.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{decoration.name}</div>
                  {decoration.price > 0 && (
                    <div className="text-sm text-purple-600">+R$ {decoration.price.toFixed(2)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Toppings (Opcional)</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableToppings.map(topping => (
                <div
                  key={topping.id}
                  onClick={() => handleToppingToggle(topping.id)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    customization.toppings.includes(topping.id)
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold">{topping.name}</div>
                  <div className="text-sm text-purple-600">+R$ {topping.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Message */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Mensagem Personalizada</h3>
            <input
              type="text"
              value={customization.message}
              onChange={(e) => setCustomization({...customization, message: e.target.value})}
              placeholder="Ex: Parabéns Maria! Feliz Aniversário!"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Special Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Pedidos Especiais</h3>
            <textarea
              value={customization.specialRequests}
              onChange={(e) => setCustomization({...customization, specialRequests: e.target.value})}
              placeholder="Alguma observação especial? (opcional)"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Adicionar ao Carrinho - R$ {totalPrice.toFixed(2)}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default CakeCustomizer

