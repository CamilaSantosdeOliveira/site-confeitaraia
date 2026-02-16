import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  async getProfile() {
    try {
      const response = await apiClient.get('/user_profile.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/user_profile.php', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAddresses() {
    try {
      const response = await apiClient.get('/user_addresses.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addAddress(addressData) {
    try {
      const response = await apiClient.post('/user_addresses.php', addressData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateAddress(addressId, addressData) {
    try {
      const response = await apiClient.put('/user_addresses.php', {
        id: addressId,
        ...addressData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteAddress(addressId) {
    try {
      const response = await apiClient.delete(`/user_addresses.php?id=${addressId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getFavorites() {
    try {
      const response = await apiClient.get('/user_favorites_simple.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addFavorite(productId) {
    try {
      const response = await apiClient.post('/user_favorites_simple.php', {
        product_id: productId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async removeFavorite(productId) {
    try {
      const response = await apiClient.delete(`/user_favorites_simple.php?product_id=${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getNotifications(limit = 10, offset = 0) {
    try {
      const response = await apiClient.get(`/user_notifications.php?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiClient.put('/user_notifications.php', {
        id: notificationId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteNotification(notificationId) {
    try {
      const response = await apiClient.delete(`/user_notifications.php?id=${notificationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
