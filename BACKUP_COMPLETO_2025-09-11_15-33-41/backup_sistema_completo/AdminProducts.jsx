import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Package
} from 'lucide-react'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  
  // 🆕 ESTADOS PARA MODAIS
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [showViewProductModal, setShowViewProductModal] = useState(false)
  const [showEditProductModal, setShowEditProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Bolos',
    description: '',
    image: '',
    tags: ''
  })
  const [submitting, setSubmitting] = useState(false)

  // 🎯 FUNÇÃO PARA BUSCAR PRODUTOS DO MYSQL
  const fetchProducts = async () => {
    try {
      setLoading(true)
      console.log('🔄 Buscando produtos do MySQL...')
      
                           const response = await fetch('http://localhost:8080/api/products.php')
      
      if (response.ok) {
        const mysqlProducts = await response.json()
        console.log('✅ Produtos recebidos do MySQL:', mysqlProducts)
        
        // 📊 TRANSFORMAR DADOS DO MYSQL
        const transformedProducts = mysqlProducts.map(product => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price || 0),
          stock: parseInt(product.stock || 0),
          category: product.category,
          description: product.description || 'Descrição não disponível',
          image: product.image || '/images/placeholder.jpg',
          status: product.status || 'active',
          sales: parseInt(product.sales || 0),
          revenue: parseFloat(product.price || 0) * parseInt(product.sales || 0),
          createdAt: product.created_at || product.date || new Date().toISOString(),
          tags: product.tags ? product.tags.split(',').map(tag => tag.trim()) : []
        }))
        
        setProducts(transformedProducts)
        console.log('✅ Produtos carregados do MySQL:', transformedProducts.length)
        console.log('📋 Lista de produtos:', transformedProducts)
      } else {
        throw new Error('Erro ao conectar com MySQL')
      }
    } catch (error) {
      console.error('❌ Erro ao carregar produtos do MySQL:', error)
      
      // 🚨 MOSTRAR ERRO PARA O USUÁRIO
      alert(`❌ Erro ao conectar com o banco de dados!\n\nVerifique se:\n• XAMPP está rodando\n• MySQL está ativo\n• API está funcionando\n\nErro: ${error.message}`)
      
      // 🔄 TENTAR NOVAMENTE EM 5 SEGUNDOS
      setTimeout(() => {
        fetchProducts()
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  // 🚀 CARREGAR PRODUTOS AO INICIAR
  useEffect(() => {
    console.log('🚀 Componente AdminProducts montado')
    // Limpar produtos antigos e buscar do banco
    setProducts([])
    fetchProducts()
  }, [])

  // 🔄 FUNÇÃO PARA ATUALIZAR PRODUTOS
  const refreshProducts = () => {
    console.log('🔄 Atualizando produtos...')
    fetchProducts()
  }

  // 🖼️ FUNÇÃO PARA TRATAR ERRO DE IMAGEM
  const handleImageError = (productName) => {
    console.warn(`⚠️ Imagem não encontrada para: ${productName}`)
  }

  // 🆕 FUNÇÕES PARA MODAL DE NOVO PRODUTO
  const openNewProductModal = () => {
    setShowNewProductModal(true)
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: 'Bolos',
      description: '',
      image: '',
      tags: ''
    })
  }

  // 🔍 FUNÇÕES PARA BOTÕES DE AÇÃO
  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setShowViewProductModal(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowEditProductModal(true)
  }

  const handleDeleteProduct = async (product) => {
    if (confirm(`🗑️ Tem certeza que deseja excluir "${product.name}"?\n\nEsta ação não pode ser desfeita.`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/delete_product.php`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: product.id })
        })

        if (response.ok) {
          alert(`✅ Produto "${product.name}" excluído com sucesso!`)
          fetchProducts() // Recarregar lista
        } else {
          throw new Error('Erro ao excluir produto')
        }
      } catch (error) {
        alert(`❌ Erro ao excluir produto: ${error.message}`)
      }
    }
  }

  const closeNewProductModal = () => {
    setShowNewProductModal(false)
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: 'Bolos',
      description: '',
      image: '',
      tags: ''
    })
  }

  const closeViewProductModal = () => {
    setShowViewProductModal(false)
    setSelectedProduct(null)
  }

  const closeEditProductModal = () => {
    setShowEditProductModal(false)
    setSelectedProduct(null)
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setSelectedProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct.name || !selectedProduct.price || !selectedProduct.stock) {
      alert('❌ Preencha os campos obrigatórios: Nome, Preço e Estoque')
      return
    }

    try {
      setSubmitting(true)
      
      const response = await fetch(`http://localhost:8080/api/update_product.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: parseFloat(selectedProduct.price),
          stock: parseInt(selectedProduct.stock),
          category: selectedProduct.category,
          description: selectedProduct.description,
          image: selectedProduct.image,
          tags: selectedProduct.tags
        })
      })

      if (response.ok) {
        alert('✅ Produto atualizado com sucesso!')
        closeEditProductModal()
        fetchProducts() // Recarregar lista
      } else {
        throw new Error('Erro ao atualizar produto')
      }
    } catch (error) {
      alert(`❌ Erro ao atualizar produto: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const createNewProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('❌ Preencha os campos obrigatórios: Nome, Preço e Estoque')
      return
    }

    try {
      setSubmitting(true)
      console.log('🆕 Criando novo produto:', newProduct)

      // 🔧 URL da API com fallback - USANDO XAMPP (porta 8080)
      const apiUrl = 'http://localhost:8080/api/insert_products.php'
      console.log('🌐 Tentando conectar com:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          category: newProduct.category,
          description: newProduct.description || 'Descrição não disponível',
          image: newProduct.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
          tags: newProduct.tags || 'novo,confeitaria'
        })
      })

      console.log('📡 Resposta da API:', response.status, response.statusText)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Produto criado com sucesso:', result)
        
        alert('🎉 Produto criado com sucesso!')
        closeNewProductModal()
        
        // 🔄 Recarregar produtos
        fetchProducts()
      } else {
        const errorText = await response.text()
        console.error('❌ Erro da API:', errorText)
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error)
      
      // 🚨 MENSAGEM DE ERRO MAIS DETALHADA
      let errorMessage = 'Erro desconhecido'
      
             if (error.name === 'TypeError' && error.message.includes('fetch')) {
         errorMessage = `❌ Erro de conexão!\n\nVerifique se:\n• XAMPP está rodando (porta 8080)\n• MySQL está ativo\n• Arquivos PHP estão na pasta htdocs\n\nErro: ${error.message}`
       } else {
        errorMessage = `❌ Erro ao criar produto: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  // 🔍 FILTRAR PRODUTOS
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  // 📊 ORDENAR PRODUTOS
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.price - b.price
      case 'stock':
        return b.stock - a.stock
      case 'sales':
        return b.sales - a.sales
      case 'revenue':
        return b.revenue - a.revenue
      default:
        return 0
    }
  })

  // 🎨 FUNÇÃO PARA OBTER COR DO ESTOQUE
  const getStockColor = (stock) => {
    if (stock >= 20) return 'text-green-600'
    if (stock >= 10) return 'text-yellow-600'
    return 'text-red-600'
  }

  // 🏷️ FUNÇÃO PARA OBTER LABEL DO ESTOQUE
  const getStockLabel = (stock) => {
    if (stock >= 20) return 'Estoque alto'
    if (stock >= 10) return 'Estoque moderado'
    return 'Estoque baixo'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Principal - ESPAÇAMENTO AUMENTADO */}
      <div className="mb-6 sm:mb-8 lg:mb-10 pt-8 sm:pt-12 lg:pt-16 xl:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Título e Descrição - Mais Espaço */}
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-800 leading-tight tracking-wide">
              Gestão de Produtos
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={refreshProducts}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>🔄</span>
              Atualizar
            </button>
            
            <button 
              onClick={openNewProductModal}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todas as Categorias</option>
              <option value="Bolos">Bolos</option>
              <option value="Tortas">Tortas</option>
              <option value="Cupcakes">Cupcakes</option>
              <option value="Doces">Doces</option>
              <option value="Sobremesas">Sobremesas</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="price">Ordenar por Preço</option>
              <option value="stock">Ordenar por Estoque</option>
              <option value="sales">Ordenar por Vendas</option>
              <option value="revenue">Ordenar por Receita</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Catálogo de Produtos</h2>
          <p className="text-gray-600 mt-1">{sortedProducts.length} produtos encontrados</p>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou adicionar novos produtos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Imagem do Produto */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(product.name)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>

                {/* Informações do Produto */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-purple-600">R$ {product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">ID: {product.id}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Estoque:</span>
                      <span className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                        {getStockLabel(product.stock)} ({product.stock} unid.)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {product.tags && product.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estatísticas do Produto */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vendas</p>
                      <p className="text-lg font-semibold text-gray-900">{product.sales}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Receita</p>
                      <p className="text-lg font-semibold text-green-600">R$ {product.revenue.toFixed(0)}</p>
                    </div>
                  </div>

                                     {/* Ações */}
                   <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                     <button 
                       onClick={() => handleViewProduct(product)}
                       className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md"
                     >
                       <Eye className="w-4 h-4 inline mr-1" />
                       Ver
                     </button>
                     <button 
                       onClick={() => handleEditProduct(product)}
                       className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                     >
                       <Edit className="w-4 h-4 inline mr-1" />
                       Editar
                     </button>
                     <button 
                       onClick={() => handleDeleteProduct(product)}
                       className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
                 )}
       </div>

               {/* 🆕 MODAL DE NOVO PRODUTO - COMPACTO */}
        {showNewProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header do Modal - Compacto */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Novo Produto</h2>
                  <button
                    onClick={closeNewProductModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              </div>

              {/* Formulário - Compacto */}
              <div className="p-4 space-y-4">
                {/* Nome e Preço */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Bolo de Chocolate"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Preço (R$) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="45.00"
                      required
                    />
                  </div>
                </div>

                {/* Estoque e Categoria */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Estoque *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Bolos">Bolos</option>
                      <option value="Tortas">Tortas</option>
                      <option value="Cupcakes">Cupcakes</option>
                      <option value="Doces">Doces</option>
                      <option value="Sobremesas">Sobremesas</option>
                    </select>
                  </div>
                </div>

                {/* Descrição - Compacta */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva o produto..."
                  />
                </div>

                {/* Imagem e Tags - Compactos */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Imagem URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={newProduct.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="chocolate,bolo"
                    />
                  </div>
                </div>
              </div>

              {/* Botões do Modal - Compactos */}
              <div className="p-4 border-t border-gray-200 flex gap-2 justify-end">
                <button
                  onClick={closeNewProductModal}
                  disabled={submitting}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={createNewProduct}
                  disabled={submitting}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      Criar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
                 )}

        {/* 🔍 MODAL DE VISUALIZAÇÃO DE PRODUTO */}
        {showViewProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header do Modal */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Detalhes do Produto</h2>
                  <button
                    onClick={closeViewProductModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Imagem */}
                  <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(selectedProduct.name)}
                    />
                  </div>

                  {/* Informações */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                      <p className="text-lg text-gray-600">{selectedProduct.category}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Preço:</span>
                        <span className="text-2xl font-bold text-purple-600">R$ {selectedProduct.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Estoque:</span>
                        <span className={`text-lg font-semibold ${getStockColor(selectedProduct.stock)}`}>
                          {selectedProduct.stock} unidades
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Vendas:</span>
                        <span className="text-lg font-semibold text-gray-900">{selectedProduct.sales}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Receita:</span>
                        <span className="text-lg font-semibold text-green-600">R$ {selectedProduct.revenue.toFixed(0)}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Descrição:</h4>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={closeViewProductModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    closeViewProductModal()
                    handleEditProduct(selectedProduct)
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  Editar Produto
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ✏️ MODAL DE EDIÇÃO DE PRODUTO - COMPACTO */}
        {showEditProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header do Modal - Compacto */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Editar Produto</h2>
                  <button
                    onClick={closeEditProductModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              </div>

              {/* Formulário de Edição - Compacto */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nome *</label>
                    <input
                      type="text"
                      name="name"
                      value={selectedProduct.name}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Preço (R$) *</label>
                    <input
                      type="number"
                      name="price"
                      value={selectedProduct.price}
                      onChange={handleEditInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Estoque *</label>
                    <input
                      type="number"
                      name="stock"
                      value={selectedProduct.stock}
                      onChange={handleEditInputChange}
                      min="0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                      name="category"
                      value={selectedProduct.category}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Bolos">Bolos</option>
                      <option value="Tortas">Tortas</option>
                      <option value="Cupcakes">Cupcakes</option>
                      <option value="Doces">Doces</option>
                      <option value="Sobremesas">Sobremesas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleEditInputChange}
                    rows="2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Imagem URL</label>
                    <input
                      type="url"
                      name="image"
                      value={selectedProduct.image}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={Array.isArray(selectedProduct.tags) ? selectedProduct.tags.join(', ') : selectedProduct.tags}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="chocolate,bolo,doce"
                    />
                  </div>
                </div>
              </div>

              {/* Botões - Compactos */}
              <div className="p-4 border-t border-gray-200 flex gap-2 justify-end">
                <button
                  onClick={closeEditProductModal}
                  disabled={submitting}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateProduct}
                  disabled={submitting}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <Edit className="w-3 h-3" />
                      Atualizar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }

export default AdminProducts
