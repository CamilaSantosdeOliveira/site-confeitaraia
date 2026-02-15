import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Função para obter token de autenticação
const getAuthToken = () => {
  // Primeiro tenta pegar do localStorage com a chave 'auth-token'
  const authToken = localStorage.getItem('auth-token');
  if (authToken) {
    return authToken;
  }
  
  // Se não encontrar, tenta pegar do user-data
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
  console.log('Token encontrado:', token ? 'SIM' : 'NÃO');
  console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'Nenhum');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Buscar perfil completo do usuário
  async getProfile() {
    try {
      const response = await apiClient.get('/user_profile.php');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  // Atualizar perfil do usuário
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/user_profile.php', profileData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  // Buscar endereços do usuário
  async getAddresses() {
    try {
      const response = await apiClient.get('/user_addresses.php');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw error;
    }
  },

  // Adicionar novo endereço
  async addAddress(addressData) {
    try {
      const response = await apiClient.post('/user_addresses.php', addressData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      throw error;
    }
  },

  // Atualizar endereço
  async updateAddress(addressId, addressData) {
    try {
      const response = await apiClient.put('/user_addresses.php', {
        id: addressId,
        ...addressData
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      throw error;
    }
  },

  // Remover endereço
  async deleteAddress(addressId) {
    try {
      const response = await apiClient.delete(`/user_addresses.php?id=${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover endereço:', error);
      throw error;
    }
  },

  // Buscar favoritos do usuário
  async getFavorites() {
    try {
      const response = await apiClient.get('/user_favorites.php');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      throw error;
    }
  },

  // Adicionar produto aos favoritos
  async addFavorite(productId) {
    try {
      const response = await apiClient.post('/user_favorites.php', {
        product_id: productId
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  },

  // Remover produto dos favoritos
  async removeFavorite(productId) {
    try {
      const response = await apiClient.delete(`/user_favorites.php?product_id=${productId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  },

  // Buscar notificações do usuário
  async getNotifications(limit = 10, offset = 0) {
    try {
      const response = await apiClient.get(`/user_notifications.php?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw error;
    }
  },

  // Marcar notificação como lida
  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiClient.put('/user_notifications.php', {
        id: notificationId
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      throw error;
    }
  },

  // Remover notificação
  async deleteNotification(notificationId) {
    try {
      const response = await apiClient.delete(`/user_notifications.php?id=${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover notificação:', error);
      throw error;
    }
  }
};
