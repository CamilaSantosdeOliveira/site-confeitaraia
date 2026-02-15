import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: [],
    revenueData: [],
    categoryData: []
  })
  const [loading, setLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState('week')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const timeoutRef = useRef(null)
  const isMountedRef = useRef(true)

  // Hook para detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    fetchDashboardData()
    
    // Cleanup quando componente desmontar ou timeFilter mudar
    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [timeFilter])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // 🎯 BUSCAR DADOS REAIS DO MYSQL - SEMPRE!
      const [ordersResponse, productsResponse, customersResponse] = await Promise.all([
        fetch('http://localhost:8000/orders.php'),
        fetch('http://localhost:8000/products.php'),
        fetch('http://localhost:8000/customers.php')
      ])
      
      if (!ordersResponse.ok || !productsResponse.ok || !customersResponse.ok) {
        throw new Error('Erro ao conectar com o banco de dados')
      }
      
      const orders = await ordersResponse.json()
      const products = await productsResponse.json()
      const customers = await customersResponse.json()
      
      // 📊 CALCULAR ESTATÍSTICAS REAIS
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0)
      const totalOrders = orders.length
      const totalCustomers = customers.length
      const totalProducts = products.length
      
      // 🕒 PEDIDOS RECENTES (últimos 4)
      const recentOrders = orders
        .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
        .slice(0, 4)
        .map(order => ({
          id: order.id,
          customer: order.customer_name || order.customer,
          amount: parseFloat(order.total || 0),
          status: order.status || 'pending',
          time: getTimeAgo(new Date(order.created_at || order.date))
        }))
      
      // 📈 PRODUTOS MAIS VENDIDOS
      const topProducts = products
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 4)
        .map(product => ({
          name: product.name,
          sales: product.sales || 0,
          revenue: (product.sales || 0) * parseFloat(product.price || 0)
        }))
      
      // 📅 DADOS DE RECEITA POR DIA (última semana)
      const revenueData = generateRevenueData(orders)
      
      // 🎂 DISTRIBUIÇÃO POR CATEGORIA
      const categoryData = generateCategoryData(products)
      
      const realData = {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        recentOrders,
        topProducts,
        revenueData,
        categoryData
      }
      
      setStats(realData)
      setLoading(false)
      
      // 🔄 ATUALIZAR AUTOMATICAMENTE A CADA 30 SEGUNDOS (só se componente ainda estiver montado)
      if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchDashboardData()
          }
        }, 30000)
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      
      // 🔄 TENTAR NOVAMENTE EM 3 SEGUNDOS (SEM ALERT - RECONEXÃO SILENCIOSA)
      if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchDashboardData()
          }
        }, 3000)
      }
      
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing': return <Clock className="w-4 h-4 text-blue-500" />
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default: return <Eye className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200'
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  // 🕒 FUNÇÃO PARA CALCULAR TEMPO ATRÁS
  const getTimeAgo = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`
  }

  // 📅 FUNÇÃO PARA GERAR DADOS DE RECEITA POR DIA
  const generateRevenueData = (orders) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const today = new Date()
    const revenueData = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = days[date.getDay()]
      
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at || order.date)
        return orderDate.toDateString() === date.toDateString()
      })
      
      const revenue = dayOrders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0)
      const orderCount = dayOrders.length
      
      revenueData.push({
        day: dayName,
        revenue: Math.round(revenue * 100) / 100,
        orders: orderCount
      })
    }
    
    return revenueData
  }

  // 🎂 FUNÇÃO PARA GERAR DADOS DE CATEGORIA
  const generateCategoryData = (products) => {
    const categories = {}
    
    products.forEach(product => {
      const category = product.category || 'Outros'
      if (!categories[category]) {
        categories[category] = { count: 0, total: 0 }
      }
      categories[category].count++
      categories[category].total += parseFloat(product.price || 0)
    })
    
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
    let colorIndex = 0
    
    return Object.entries(categories)
      .map(([name, data]) => {
        const percentage = Math.round((data.count / products.length) * 100)
        const color = colors[colorIndex % colors.length]
        colorIndex++
        
        return {
          name,
          value: percentage,
          color
        }
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }

  // 📊 FUNÇÃO PARA GERAR RELATÓRIO COMPLETO
  const generateFullReport = () => {
    const reportData = {
      dashboard: 'Relatório Completo - Dashboard Executivo',
      generatedAt: new Date().toLocaleString('pt-BR'),
      period: timeFilter === 'week' ? 'Última Semana' : 
              timeFilter === 'month' ? 'Último Mês' : 
              timeFilter === 'quarter' ? 'Último Trimestre' : 'Último Ano',
      summary: {
        totalRevenue: stats.totalRevenue,
        totalOrders: stats.totalOrders,
        totalCustomers: stats.totalCustomers,
        totalProducts: stats.totalProducts
      },
      topProducts: stats.topProducts,
      recentOrders: stats.recentOrders,
      revenueData: stats.revenueData,
      categoryData: stats.categoryData
    }
    
    // 📄 CRIAR ARQUIVO PDF OU DOWNLOAD
    const reportContent = `
=== RELATÓRIO COMPLETO - DASHBOARD EXECUTIVO ===
Gerado em: ${reportData.generatedAt}
Período: ${reportData.period}

📊 RESUMO EXECUTIVO:
• Receita Total: R$ ${reportData.summary.totalRevenue.toFixed(2)}
• Total de Pedidos: ${reportData.summary.totalOrders}
• Total de Clientes: ${reportData.summary.totalCustomers}
• Total de Produtos: ${reportData.summary.totalProducts}

🏆 PRODUTOS MAIS VENDIDOS:
${reportData.topProducts.map((product, index) => 
  `${index + 1}. ${product.name} - ${product.sales} vendas - R$ ${product.revenue.toFixed(2)}`
).join('\n')}

📈 RECEITA POR DIA:
${reportData.revenueData.map(day => 
  `${day.day}: R$ ${day.revenue.toFixed(2)} (${day.orders} pedidos)`
).join('\n')}

🎂 DISTRIBUIÇÃO POR CATEGORIA:
${reportData.categoryData.map(cat => 
  `${cat.name}: ${cat.value}%`
).join('\n')}

🛒 PEDIDOS RECENTES:
${reportData.recentOrders.map(order => 
  `${order.customer} - R$ ${order.amount.toFixed(2)} - ${order.status} - ${order.time}`
).join('\n')}
    `
    
    // 💾 DOWNLOAD DO RELATÓRIO
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio-dashboard-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    // 🎉 NOTIFICAÇÃO DE SUCESSO
    alert(`✅ Relatório Completo Gerado!\n\n📄 Arquivo: relatorio-dashboard-${new Date().toISOString().split('T')[0]}.txt\n📊 Dados: ${reportData.summary.totalOrders} pedidos, ${reportData.summary.totalCustomers} clientes\n💰 Receita: R$ ${reportData.summary.totalRevenue.toFixed(2)}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-purple-500 mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Carregando Dashboard</h3>
          <p className="text-sm text-gray-500">Preparando suas métricas...</p>
        </div>
      </div>
    )
  }

  return (
         <div className="min-h-screen bg-gray-50">
       {/* Header Principal - ESPAÇAMENTO AUMENTADO */}
       <div className="mb-6 sm:mb-8 lg:mb-10 pt-4 sm:pt-6 lg:pt-8 xl:pt-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Título e Descrição - Mais Espaço */}
          <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-gray-900 mb-2">
              Dashboard Executivo
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Visão geral do negócio e métricas de performance
            </p>
          </div>
          
          {/* Controles - Layout Responsivo Inteligente */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-5">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 sm:px-5 py-3 sm:py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-sm font-medium min-w-[160px] sm:min-w-[180px] transition-all duration-200"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
            
            <button 
              onClick={generateFullReport}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[160px] sm:min-w-[180px] group"
            >
              <TrendingUp className="w-5 h-5 sm:w-6 sm:w-6 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Relatório Completo</span>
              <span className="sm:hidden">Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas Principais - RESPONSIVO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Receita Total</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Total de Pedidos</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Total de Clientes</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.totalCustomers}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Total de Produtos</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gráficos e Dados - Layout Otimizado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
        {/* Gráfico de Receita */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Receita por Período</h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
              <span>Receita</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={windowWidth >= 1024 ? 280 : windowWidth >= 640 ? 250 : 200}>
            <BarChart data={stats.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280" 
                fontSize={windowWidth >= 640 ? 12 : 11}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={windowWidth >= 640 ? 12 : 11}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#revenueGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico de Categorias */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Produtos por Categoria</h3>
            <span className="text-xs sm:text-sm text-gray-500">Distribuição atual</span>
          </div>
          
          <ResponsiveContainer width="100%" height={windowWidth >= 1024 ? 280 : windowWidth >= 640 ? 250 : 200}>
            <PieChart>
              <Pie
                data={stats.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={windowWidth >= 1024 ? 60 : windowWidth >= 640 ? 50 : 40}
                outerRadius={windowWidth >= 1024 ? 80 : windowWidth >= 640 ? 70 : 60}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            {stats.categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Seções Inferiores - Layout Responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {/* Pedidos Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Pedidos Recentes</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm transition-colors duration-200">
              Ver todos
            </button>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">R$ {order.amount.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status === 'completed' ? 'Concluído' : 
                     order.status === 'processing' ? 'Processando' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Produtos Mais Vendidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Produtos em Alta</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm transition-colors duration-200">
              Ver catálogo
            </button>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {stats.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} vendas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">R$ {product.revenue.toFixed(2)}</p>
                  <p className="text-xs text-green-600 font-medium">+{Math.floor(Math.random() * 20 + 10)}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
