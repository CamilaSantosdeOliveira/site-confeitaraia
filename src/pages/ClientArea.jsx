import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Package, Heart, Bell, Settings, MapPin, Phone, Mail, Calendar, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContextReal'
import { useNotifications } from '../components/NotificationSystem'
import { Link, useNavigate } from 'react-router-dom'
import { userService } from '../services/userService'

const ClientArea = () => {
  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    user: null,
    profile: null,
    addresses: [],
    favorites: [],
    notifications: []
  })
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  // Dados mockados para pedidos (ainda não implementado)
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-10',
      status: 'delivered',
      total: 125.50,
      items: ['Bolo de Chocolate', 'Cupcakes de Morango'],
      tracking: 'Entregue em 10/01/2025 às 14:30'
    },
    {
      id: 'ORD-002', 
      date: '2025-01-08',
      status: 'preparing',
      total: 89.00,
      items: ['Torta de Limão', 'Doces Finos'],
      tracking: 'Em preparação - Entrega prevista para 12/01/2025'
    },
    {
      id: 'ORD-003',
      date: '2025-01-05',
      status: 'confirmed',
      total: 156.75,
      items: ['Bolo de Aniversário', 'Cupcakes Personalizados'],
      tracking: 'Pedido confirmado - Aguardando preparação'
    }
  ]

  // Carregar dados reais do usuário
  useEffect(() => {
    const loadUserData = async () => {
      console.log('loadUserData chamado');
      console.log('isAuthenticated:', isAuthenticated);
      console.log('user:', user);
      
      if (!isAuthenticated || !user) {
        console.log('Usuário não autenticado, saindo...');
        return;
      }
      
      try {
        setIsLoading(true);
        console.log('Chamando userService.getProfile()...');
        const data = await userService.getProfile();
        console.log('Dados recebidos:', data);
        setUserData(data);
        
        // Atualizar formulário de edição com dados reais
        const primaryAddress = data.addresses?.find(addr => addr.is_primary) || data.addresses?.[0];
        setEditForm({
          name: data.user?.name || '',
          email: data.user?.email || '',
          phone: data.profile?.phone || '',
          address: {
            street: primaryAddress?.street || '',
            neighborhood: primaryAddress?.neighborhood || '',
            city: primaryAddress?.city || '',
            state: primaryAddress?.state || '',
            zipCode: primaryAddress?.zip_code || ''
          }
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // addNotification({
        //   type: 'error',
        //   title: 'Erro',
        //   message: 'Erro ao carregar dados do usuário'
        // });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated, user, addNotification]);

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <User className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar sua área do cliente.</p>
          <Link 
            to="/login" 
            className="bg-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors shadow-lg"
          >
            Fazer Login
          </Link>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando seus dados...</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'preparing': return 'text-blue-600 bg-blue-100'
      case 'confirmed': return 'text-yellow-600 bg-yellow-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Entregue'
      case 'preparing': return 'Em Preparação'
      case 'confirmed': return 'Confirmado'
      case 'pending': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅'
      case 'promotion': return '🎉'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
  }

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsOrderDetailsModalOpen(true)
  }

  const handleCloseOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false)
    setSelectedOrder(null)
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSaveProfile = async () => {
    // Validação básica
    if (!editForm.name.trim()) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Nome é obrigatório!'
      })
      return
    }

    if (!editForm.email.trim()) {
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'E-mail é obrigatório!'
      })
      return
    }

    try {
      // Atualizar perfil
      await userService.updateProfile({
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone
      });

      // Atualizar endereço principal se existir
      const primaryAddress = userData.addresses?.find(addr => addr.is_primary);
      if (primaryAddress && editForm.address.street) {
        await userService.updateAddress(primaryAddress.id, {
          street: editForm.address.street,
          neighborhood: editForm.address.neighborhood,
          city: editForm.address.city,
          state: editForm.address.state,
          zip_code: editForm.address.zipCode
        });
      }

      // Recarregar dados
      const updatedData = await userService.getProfile();
      setUserData(updatedData);

      addNotification({
        type: 'success',
        title: 'Perfil Atualizado',
        message: 'Seus dados foram salvos com sucesso!'
      })

      setIsEditModalOpen(false)
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao salvar dados. Tente novamente.'
      })
    }
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'orders', label: 'Pedidos', icon: Package },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'notifications', label: 'Notificações', icon: Bell }
  ]

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-gray-800 mb-6">
            Minha Área
          </h1>
          <p className="text-lg text-gray-600">
            Olá, {user?.name}! Gerencie sua conta e acompanhe seus pedidos
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-1 mb-8"
          >
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-pink-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-pink-500" />
                  Meu Perfil
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800">{userData.user?.name || user?.name || 'Nome não informado'}</p>
                          <p className="text-sm text-gray-500">Nome completo</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800">{userData.user?.email || user?.email || 'email@exemplo.com'}</p>
                          <p className="text-sm text-gray-500">E-mail</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800">{userData.profile?.phone || 'Não informado'}</p>
                          <p className="text-sm text-gray-500">Telefone</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800">Cliente desde {userData.user?.created_at ? new Date(userData.user.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Janeiro 2025'}</p>
                          <p className="text-sm text-gray-500">Membro desde</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereços</h3>
                    <div className="space-y-4">
                      {userData.addresses?.length > 0 ? (
                        userData.addresses.map((address) => (
                          <div key={address.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-gray-800">
                                    {address.is_primary ? 'Endereço Principal' : 'Endereço Secundário'}
                                  </h4>
                                  {address.is_primary && (
                                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Principal</span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {address.street}{address.number ? `, ${address.number}` : ''}<br />
                                  {address.neighborhood} - {address.city}/{address.state}<br />
                                  CEP: {address.zip_code}
                                  {address.complement && <><br />{address.complement}</>}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Nenhum endereço cadastrado</p>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => addNotification({ 
                          type: 'info', 
                          title: 'Adicionar Endereço', 
                          message: 'Funcionalidade de adicionar endereço será implementada em breve!' 
                        })}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors"
                      >
                        + Adicionar Novo Endereço
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={handleEditProfile}
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-pink-500" />
                  Meus Pedidos
                </h2>
                
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">Pedido {order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                              <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
                            </div>
                            <div>
                              <p><strong>Itens:</strong> {order.items.join(', ')}</p>
                              <p><strong>Status:</strong> {order.tracking}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewOrderDetails(order)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Ver Detalhes
                          </button>
                          {order.status === 'delivered' && (
                            <button 
                              onClick={() => addNotification({ 
                                type: 'success', 
                                title: 'Pedido Adicionado', 
                                message: `Pedido ${order.id} será adicionado ao carrinho!` 
                              })}
                              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                            >
                              Pedir Novamente
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-500" />
                  Meus Favoritos
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.favorites?.length > 0 ? (
                    userData.favorites.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                          <span className="text-gray-400">Imagem não disponível</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">R$ {parseFloat(product.price).toFixed(2)}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => addNotification({ 
                                type: 'success', 
                                title: 'Removido dos Favoritos', 
                                message: `${product.name} removido dos favoritos!` 
                              })}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                            <button 
                              onClick={() => {
                                addToCart(product)
                                addNotification({ 
                                  type: 'success', 
                                  title: 'Adicionado ao Carrinho', 
                                  message: `${product.name} adicionado ao carrinho!` 
                                })
                              }}
                              className="px-3 py-1 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors"
                            >
                              Comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum favorito ainda</h3>
                      <p className="text-gray-600 mb-4">Adicione produtos que você amou para encontrá-los facilmente depois.</p>
                      <Link to="/menu" className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                        Explorar Cardápio
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-pink-500" />
                  Notificações
                </h2>
                
                <div className="space-y-4">
                  {userData.notifications?.length > 0 ? (
                    userData.notifications.map((notification) => (
                      <div key={notification.id} className={`border rounded-lg p-4 ${notification.is_read ? 'bg-gray-50' : 'bg-white border-pink-200'}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{new Date(notification.created_at).toLocaleDateString('pt-BR')}</span>
                                {!notification.is_read && (
                                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma notificação</h3>
                      <p className="text-gray-600">Você não tem notificações no momento.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Modal de Edição de Perfil */}
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-pink-500" />
                    Editar Perfil
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-2 space-y-2">
                  {/* Informações Pessoais */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Digite seu nome completo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Digite seu e-mail"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Endereço Principal</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rua/Avenida
                        </label>
                        <input
                          type="text"
                          value={editForm.address.street}
                          onChange={(e) => handleInputChange('address.street', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Rua das Flores, 123"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <input
                          type="text"
                          value={editForm.address.neighborhood}
                          onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Vila Madalena"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={editForm.address.city}
                          onChange={(e) => handleInputChange('address.city', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="São Paulo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estado
                        </label>
                        <input
                          type="text"
                          value={editForm.address.state}
                          onChange={(e) => handleInputChange('address.state', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="SP"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CEP
                        </label>
                        <input
                          type="text"
                          value={editForm.address.zipCode}
                          onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="01234-567"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer do Modal */}
                <div className="flex items-center justify-end gap-2 p-2 border-t border-gray-200">
                  <button
                    onClick={handleCloseModal}
                    className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-3 py-1 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Salvar Alterações
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Modal de Detalhes do Pedido */}
          {isOrderDetailsModalOpen && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={handleCloseOrderDetailsModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-pink-500" />
                    Detalhes do Pedido {selectedOrder.id}
                  </h2>
                  <button
                    onClick={handleCloseOrderDetailsModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-4 space-y-4">
                  {/* Status do Pedido */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>

                  {/* Data e Total */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Data:</span>
                      <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total:</span>
                      <p className="font-medium text-lg text-pink-600">R$ {selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Itens do Pedido */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Itens do Pedido:</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm">{item}</span>
                          <span className="text-sm text-gray-600">1x</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rastreamento */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Rastreamento:</h3>
                    <p className="text-sm text-gray-600">{selectedOrder.tracking}</p>
                  </div>

                  {/* Endereço de Entrega */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Endereço de Entrega:</h3>
                    <div className="text-sm text-gray-600">
                      <p>Rua das Flores, 123</p>
                      <p>Vila Madalena - Mogi das Cruzes/SP</p>
                      <p>CEP: 08795-170</p>
                    </div>
                  </div>
                </div>

                {/* Footer do Modal */}
                <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
                  <button
                    onClick={handleCloseOrderDetailsModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fechar
                  </button>
                  {selectedOrder.status === 'delivered' && (
                    <button
                      onClick={() => {
                        addNotification({
                          type: 'success',
                          title: 'Pedido Adicionado',
                          message: 'Itens adicionados ao carrinho com sucesso!'
                        })
                        handleCloseOrderDetailsModal()
                      }}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Pedir Novamente
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
      </div>
    </div>
  )
}

export default ClientArea
