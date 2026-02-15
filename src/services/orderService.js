import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Função para obter token de autenticação
const getAuthToken = () => {
  const authToken = localStorage.getItem('auth-token');
  if (authToken) {
    return authToken;
  }
  
  const user = JSON.parse(localStorage.getItem('user-data') || '{}');
  return user.token || '';
};

// Configurar axios com token de autenticação
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderService = {
  // Criar novo pedido
  async createOrder(orderData) {
    try {
      console.log('🚀 Enviando pedido:', orderData);
      
      // Preparar dados no formato esperado pelo backend
      const formattedData = {
        customer_name: orderData.customer_name || 'Cliente',
        customer_email: orderData.customer_email || '',
        customer_phone: orderData.customer_phone || '',
        total: orderData.total,
        payment_method: orderData.payment_method,
        delivery_address: orderData.delivery_address,
        notes: orderData.notes || '',
        items: orderData.items || []
      };
      
      const response = await apiClient.post('/orders.php', formattedData);
      console.log('✅ Resposta do servidor:', response.data);
      
      // Verificar se a resposta tem sucesso
      if (response.data && response.data.success !== false && response.data.order_id) {
        // Retornar no formato esperado pelo frontend
        return {
          success: true,
          order_id: response.data.order_id,
          order_number: response.data.order_number,
          message: response.data.message || 'Pedido criado com sucesso'
        };
      } else {
        // Retornar erro sem lançar exceção
        return {
          success: false,
          error: response.data?.message || 'Erro ao criar pedido',
          message: response.data?.message || 'Erro ao criar pedido'
        };
      }
    } catch (error) {
      console.error('❌ Erro ao criar pedido:', error);
      console.error('❌ Status do erro:', error.response?.status);
      console.error('❌ Dados do erro:', error.response?.data);
      console.error('❌ Erro completo:', error);
      
      // Retornar erro formatado em vez de lançar exceção
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Erro ao criar pedido',
        message: error.response?.data?.message || error.message || 'Erro ao criar pedido'
      };
    }
  },

  // Buscar pedidos do usuário
  async getUserOrders() {
    try {
      const response = await apiClient.get('/orders.php');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  },

  // Buscar detalhes de um pedido específico
  async getOrderDetails(orderId) {
    try {
      const response = await apiClient.get(`/order_details.php?id=${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do pedido:', error);
      throw error;
    }
  },

  // Atualizar status do pedido (apenas admin)
  async updateOrderStatus(orderId, status, notes = '') {
    try {
      const response = await apiClient.put('/orders.php', {
        order_id: orderId,
        status: status,
        notes: notes
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw error;
    }
  },

  // Processar pagamento com Mercado Pago (simulado)
  async processPayment(paymentData) {
    try {
      // Simular processamento de pagamento
      // Em produção, aqui seria a integração real com Mercado Pago
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            payment_id: 'MP-' + Date.now(),
            status: 'approved',
            message: 'Pagamento aprovado com sucesso'
          });
        }, 2000);
      });
      
      return response;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  }
};
