import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, Search, Clock, Truck, CreditCard, Heart } from 'lucide-react'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [openItems, setOpenItems] = useState(new Set())

  const faqData = [
    {
      category: 'pedidos',
      categoryName: 'Pedidos e Entrega',
      icon: Truck,
      questions: [
        {
          id: 1,
          question: 'Como faço um pedido?',
          answer: 'É muito simples! Navegue pelo nosso cardápio, escolha os produtos desejados, adicione ao carrinho e finalize a compra. Você pode fazer pedidos 24h por dia através do nosso site.'
        },
        {
          id: 2,
          question: 'Qual o prazo de entrega?',
          answer: 'Nossos pedidos são entregues em até 2 horas na região de São Paulo. Para outras regiões, o prazo pode variar de 3 a 5 dias úteis.'
        },
        {
          id: 3,
          question: 'Posso cancelar meu pedido?',
          answer: 'Sim! Você pode cancelar seu pedido até 30 minutos após a confirmação. Após esse período, o pedido já estará em produção.'
        },
        {
          id: 4,
          question: 'Como rastrear meu pedido?',
          answer: 'Após a confirmação do pedido, você receberá um código de rastreamento por email. Você também pode acompanhar o status na sua área do cliente.'
        }
      ]
    },
    {
      category: 'pagamento',
      categoryName: 'Pagamento',
      icon: CreditCard,
      questions: [
        {
          id: 5,
          question: 'Quais formas de pagamento vocês aceitam?',
          answer: 'Aceitamos cartão de crédito (Visa, Mastercard, Elo), cartão de débito, PIX e boleto bancário. Todos os pagamentos são processados de forma segura.'
        },
        {
          id: 6,
          question: 'O pagamento é seguro?',
          answer: 'Sim! Utilizamos criptografia SSL e processamento seguro. Seus dados financeiros são protegidos e não são armazenados em nossos servidores.'
        },
        {
          id: 7,
          question: 'Posso pagar na entrega?',
          answer: 'Sim! Oferecemos a opção de pagamento na entrega para pedidos na região de São Paulo. Aceitamos dinheiro e cartão na entrega.'
        }
      ]
    },
    {
      category: 'produtos',
      categoryName: 'Produtos',
      icon: Heart,
      questions: [
        {
          id: 8,
          question: 'Os produtos são frescos?',
          answer: 'Sim! Todos os nossos produtos são feitos diariamente com ingredientes frescos e de qualidade. Não utilizamos conservantes artificiais.'
        },
        {
          id: 9,
          question: 'Vocês fazem produtos sem açúcar?',
          answer: 'Sim! Temos uma linha especial de produtos sem açúcar e com adoçantes naturais. Consulte nosso cardápio para ver as opções disponíveis.'
        },
        {
          id: 10,
          question: 'Posso personalizar meu pedido?',
          answer: 'Claro! Oferecemos opções de personalização para bolos e doces. Entre em contato conosco para discutir suas necessidades especiais.'
        },
        {
          id: 11,
          question: 'Vocês fazem produtos veganos?',
          answer: 'Sim! Temos uma variedade de produtos veganos deliciosos. Todos são claramente marcados no nosso cardápio.'
        }
      ]
    },
    {
      category: 'conta',
      categoryName: 'Conta e Favoritos',
      icon: HelpCircle,
      questions: [
        {
          id: 12,
          question: 'Como criar uma conta?',
          answer: 'Clique em "Minha Área" no menu e depois em "Criar Conta". Preencha seus dados e confirme seu email. É rápido e gratuito!'
        },
        {
          id: 13,
          question: 'Como favoritar produtos?',
          answer: 'Faça login na sua conta, navegue pelo cardápio e clique no coração nos produtos que você gosta. Seus favoritos ficam salvos na sua área do cliente.'
        },
        {
          id: 14,
          question: 'Posso ver meu histórico de pedidos?',
          answer: 'Sim! Na sua área do cliente, você pode ver todos os seus pedidos anteriores, status de entrega e fazer pedidos novamente.'
        }
      ]
    }
  ]

  const toggleItem = (itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'todos' || category.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  })).filter(category => category.questions.length > 0)

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
          </p>
        </motion.div>

        {/* Busca e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar perguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por categoria */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="todos">Todas as categorias</option>
              {faqData.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros de busca ou entre em contato conosco
              </p>
            </div>
          ) : (
            filteredFAQs.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Categoria Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
                  <div className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{category.categoryName}</h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {item.question}
                        </span>
                        {openItems.has(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {openItems.has(item.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para ajudar! Entre em contato conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
              >
                Fale Conosco
              </a>
              <a
                href="tel:+551133445566"
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-colors font-semibold"
              >
                (11) 3344-5566
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
