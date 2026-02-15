import axios from 'axios'
import { mockProducts, mockCategories } from './mockData'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Error:', error.response?.status, error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    
    // Para erros 500 ou de conexão, não rejeitar a promise
    // Isso permite que os serviços usem fallbacks
    if (error.response?.status >= 500 || error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
      console.log('Usando dados mock devido a erro de servidor')
      return Promise.resolve({ data: null, isMock: true })
    }
    
    return Promise.reject(error)
  }
)

// Serviços de produtos
export const productService = {
  getAll: async () => {
    try {
      const response = await api.get('/products')
      return response
    } catch (error) {
      console.log('Usando dados mock para getAll')
      return { data: mockProducts, isMock: true }
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`)
      return response
    } catch (error) {
      console.log('Usando dados mock para getById')
      const product = mockProducts.find(p => p.id === parseInt(id))
      return { data: product, isMock: true }
    }
  },
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`)
      return response
    } catch (error) {
      console.log('Usando dados mock para getByCategory')
      const products = mockProducts.filter(p => p.category === category)
      return { data: products, isMock: true }
    }
  },
  search: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${query}`)
      return response
    } catch (error) {
      console.log('Usando dados mock para search')
      const products = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
      return { data: products, isMock: true }
    }
  },
  getFeatured: async () => {
    try {
      const response = await api.get('/products/featured')
      return response
    } catch (error) {
      console.log('Usando dados mock para getFeatured')
      const featured = mockProducts.filter(p => p.featured)
      return { data: featured, isMock: true }
    }
  },
}

// Serviços de pedidos
export const orderService = {
  create: (orderData) => api.post('/orders', orderData),
  getById: (id) => api.get(`/orders/${id}`),
  getByUser: () => api.get('/orders/my-orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
}

// Serviços de autenticação
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
}

// Serviços de contato
export const contactService = {
  sendMessage: (messageData) => api.post('/contact', messageData),
  subscribeNewsletter: (email) => api.post('/newsletter/subscribe', { email }),
}

// Serviços administrativos
export const adminService = {
  // Produtos
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Pedidos
  getAllOrders: () => api.get('/admin/orders'),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
  
  // Usuários
  getAllUsers: () => api.get('/admin/users'),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
  // Estatísticas
  getStats: () => api.get('/admin/stats'),
  getSalesReport: (period) => api.get(`/admin/reports/sales?period=${period}`),
}

// Serviços de upload
export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// Serviços de pagamento
export const paymentService = {
  createPayment: (paymentData) => api.post('/payments', paymentData),
  getPaymentStatus: (id) => api.get(`/payments/${id}/status`),
  processWebhook: (webhookData) => api.post('/payments/webhook', webhookData),
}

// Serviços de notificação
export const notificationService = {
  sendOrderNotification: (orderId) => api.post(`/notifications/order/${orderId}`),
  sendStatusUpdate: (orderId, status) => api.post(`/notifications/status/${orderId}`, { status }),
}

export default api
