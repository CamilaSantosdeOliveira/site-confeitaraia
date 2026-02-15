import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Package, Heart, ShoppingCart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContextReal'
import { productService } from '../services/api'

const ChatWidget = () => {
  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Como posso ajudá-lo hoje?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [products, setProducts] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Carregar produtos e favoritos quando o chat abrir
  useEffect(() => {
    if (isOpen) {
      loadProducts()
      if (isAuthenticated) {
        loadUserFavorites()
      }
    }
  }, [isOpen, isAuthenticated])

  const loadProducts = async () => {
    try {
      const response = await productService.getAll()
      setProducts(response.data || [])
    } catch (error) {
      console.log('Erro ao carregar produtos para o chat:', error)
    }
  }

  const loadUserFavorites = async () => {
    try {
      const token = localStorage.getItem('auth-token')
      const response = await fetch('http://localhost:8000/user_favorites.php', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const favoritesData = await response.json()
        setUserFavorites(favoritesData)
      }
    } catch (error) {
      console.log('Erro ao carregar favoritos:', error)
    }
  }

  // Função para buscar produtos inteligentemente
  const findProducts = (query) => {
    const searchTerm = query.toLowerCase()
    
    // Buscar por palavras-chave específicas
    const keywords = searchTerm.split(' ').filter(word => word.length > 2)
    
    return products.filter(product => {
      const name = product.name?.toLowerCase() || ''
      const description = product.description?.toLowerCase() || ''
      const category = product.category?.toLowerCase() || ''
      
      // Busca exata
      if (name.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
        return true
      }
      
      // Busca por palavras-chave
      return keywords.some(keyword => 
        name.includes(keyword) || 
        description.includes(keyword) || 
        category.includes(keyword)
      )
    })
  }

  // Função para mostrar produtos por categoria
  const getProductsByCategory = (category) => {
    return products.filter(product => 
      product.category?.toLowerCase().includes(category.toLowerCase())
    )
  }

  // Função para gerar resposta inteligente
  const generateIntelligentResponse = (message) => {
    const msg = message.toLowerCase()
    let response = { type: 'text', content: '', products: [] }

    // Saudação personalizada
    if (msg.includes('oi') || msg.includes('olá') || msg.includes('ola') || msg.includes('hey') || msg.includes('eai')) {
      const userName = user?.name ? `, ${user.name.split(' ')[0]}` : ''
      response.content = `Olá${userName}! 😊 Como posso ajudá-lo hoje? Posso te ajudar com informações sobre nossos produtos, pedidos ou qualquer dúvida!`
    }
    // Perguntas de bem-estar
    else if (msg.includes('tudo bem') || msg.includes('como vai') || msg.includes('como está') || 
             msg.includes('beleza') || msg.includes('e aí') || msg.includes('eai') || 
             msg.includes('bom dia') || msg.includes('boa tarde') || msg.includes('boa noite')) {
      const userName = user?.name ? `, ${user.name.split(' ')[0]}` : ''
      response.content = `Tudo ótimo${userName}! 😊 Obrigado por perguntar! Como posso te ajudar hoje? Posso falar sobre nossos produtos, pedidos ou qualquer dúvida que você tenha!`
    }
    // Perguntas sobre sabores e cardápio
    else if (msg.includes('sabor') || msg.includes('sabores') || msg.includes('cardápio') || msg.includes('cardapio') || 
             msg.includes('menu') || msg.includes('opções') || msg.includes('opcoes') || msg.includes('tem')) {
      // Mostrar categorias e alguns produtos de exemplo
      const categories = [...new Set(products.map(p => p.category))].filter(Boolean)
      const sampleProducts = products.slice(0, 4) // Mostrar 4 produtos de exemplo
      
      if (categories.length > 0) {
        response.type = 'products'
        response.products = sampleProducts
        response.content = `Nossa confeitaria oferece uma variedade deliciosa! Temos: ${categories.join(', ')}. Aqui estão alguns dos nossos produtos:`
      } else {
        response.content = "Nossa confeitaria oferece uma variedade deliciosa! Bolos, tortas, cupcakes, doces e sobremesas. Quer ver nosso cardápio completo?"
      }
    }
    // Busca específica de produtos (deve vir antes das outras verificações)
    else if (msg.includes('bolo') || msg.includes('torta') || msg.includes('cupcake') || msg.includes('doce') || 
             msg.includes('chocolate') || msg.includes('morango') || msg.includes('baunilha') || 
             msg.includes('limão') || msg.includes('limao') || msg.includes('coco') || 
             msg.includes('produto') || msg.includes('específico') || msg.includes('especifico')) {
      const foundProducts = findProducts(message)
      if (foundProducts.length > 0) {
        response.type = 'products'
        response.products = foundProducts.slice(0, 3) // Mostrar até 3 produtos
        response.content = `Encontrei ${foundProducts.length} produto(s) que podem te interessar:`
      } else {
        response.content = "Não encontrei produtos específicos com esse sabor, mas temos uma variedade deliciosa! Bolos, tortas, cupcakes, doces e sobremesas. Quer ver nosso cardápio completo?"
      }
    }
    // Preços
    else if (msg.includes('preço') || msg.includes('preco') || msg.includes('quanto') || msg.includes('valor')) {
      const foundProducts = findProducts(message)
      if (foundProducts.length > 0) {
        response.type = 'products'
        response.products = foundProducts.slice(0, 3)
        response.content = `Aqui estão os preços dos produtos que encontrei:`
      } else {
        const priceRange = products.length > 0 ? 
          `Nossos produtos variam de R$ ${Math.min(...products.map(p => parseFloat(p.price) || 0)).toFixed(2)} a R$ ${Math.max(...products.map(p => parseFloat(p.price) || 0)).toFixed(2)}` :
          "Nossos produtos variam de R$ 0,19 a R$ 45,00"
        response.content = `${priceRange}. Quer saber o preço de algum produto específico?`
      }
    }
    // Favoritos
    else if (msg.includes('favorito') || msg.includes('favoritar') || msg.includes('gostei')) {
      if (isAuthenticated && userFavorites.length > 0) {
        response.type = 'favorites'
        response.products = userFavorites.slice(0, 3)
        response.content = `Você tem ${userFavorites.length} produto(s) nos favoritos. Aqui estão alguns:`
      } else if (isAuthenticated) {
        response.content = "Você ainda não tem favoritos! Para adicionar, clique no coração nos produtos do cardápio."
      } else {
        response.content = "Para favoritar produtos, você precisa fazer login primeiro. Depois, basta clicar no coração nos produtos!"
      }
    }
    // Carrinho
    else if (msg.includes('carrinho') || msg.includes('comprar') || msg.includes('adicionar')) {
      response.content = "Para adicionar ao carrinho, clique no botão 'Adicionar ao Carrinho' nos produtos! Você pode finalizar a compra na página do carrinho."
    }
    // Pedidos
    else if (msg.includes('pedido') || msg.includes('entrega') || msg.includes('delivery') || msg.includes('rastrear')) {
      response.content = "Posso te ajudar com informações sobre pedidos! Nossos pedidos são entregues em até 2 horas. Quer fazer um pedido ou rastrear um existente?"
    }
    // Conta/Login
    else if (msg.includes('conta') || msg.includes('login') || msg.includes('cadastro') || msg.includes('perfil')) {
      if (isAuthenticated) {
        response.content = `Olá, ${user?.name}! Você já está logado. Acesse 'Minha Área' no menu para gerenciar seu perfil, ver pedidos e favoritos.`
      } else {
        response.content = "Para acessar sua conta, clique em 'Entrar' no menu! Lá você pode fazer login ou criar uma conta nova."
      }
    }
    // Horário
    else if (msg.includes('horário') || msg.includes('horario') || msg.includes('funciona') || msg.includes('aberto')) {
      response.content = "Funcionamos de Terça a Sábado das 9h às 18h e Domingo das 10h às 14h. Estamos fechados às segundas-feiras."
    }
    // Endereço
    else if (msg.includes('endereço') || msg.includes('endereco') || msg.includes('localização') || msg.includes('onde')) {
      response.content = "Estamos localizados na Rua das Delícias, 456 - Vila Madalena, São Paulo/SP. Telefone: (11) 3344-5566"
    }
    // Agradecimento
    else if (msg.includes('obrigado') || msg.includes('obrigada') || msg.includes('valeu') || msg.includes('obrigad')) {
      response.content = "De nada! 😊 Foi um prazer ajudar! Se precisar de mais alguma coisa, estou aqui!"
    }
    // Despedida
    else if (msg.includes('tchau') || msg.includes('até') || msg.includes('ate') || msg.includes('bye')) {
      response.content = "Tchau! 👋 Volte sempre! Estarei aqui quando precisar de ajuda!"
    }
    // Resposta genérica inteligente
    else {
      const genericResponses = [
        "Entendi! Como posso te ajudar melhor? Posso falar sobre nossos produtos, pedidos, favoritos ou qualquer outra coisa! 😊",
        "Interessante! Posso te ajudar com informações sobre nossa confeitaria, produtos ou serviços. O que você gostaria de saber?",
        "Ótimo! Estou aqui para ajudar! Posso falar sobre preços, cardápio, pedidos, favoritos ou qualquer dúvida que você tenha!",
        "Perfeito! Nossa equipe está aqui para ajudar! Posso te orientar sobre produtos, pedidos ou qualquer informação que precisar!"
      ]
      response.content = genericResponses[Math.floor(Math.random() * genericResponses.length)]
    }

    return response
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Gerar resposta inteligente
    setTimeout(() => {
      const intelligentResponse = generateIntelligentResponse(newMessage)
      
      const botMessage = {
        id: Date.now() + 1,
        text: intelligentResponse.content,
        sender: 'bot',
        timestamp: new Date(),
        type: intelligentResponse.type,
        products: intelligentResponse.products || []
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botão do Chat */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Widget do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-pink-500 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Suporte Online</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-pink-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Mostrar produtos se for do tipo products */}
                      {message.type === 'products' && message.products && message.products.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.products.map((product, index) => (
                            <div key={index} className="bg-white p-2 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2">
                                {product.image && (
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-800 truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-pink-600 font-semibold">
                                    R$ {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="p-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
                                  title="Adicionar ao carrinho"
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
