// Configuração do Mercado Pago (versão simplificada)
const MERCADOPAGO_ACCESS_TOKEN = import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN || 'TEST-1234567890-abcdef-1234567890abcdef-12345678'

export const paymentService = {
  // Criar preferência de pagamento
  createPreference: async (orderData) => {
    try {
      const preferenceData = {
        items: orderData.items.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL',
          description: item.description || item.name
        })),
        payer: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: {
            number: orderData.customer.phone || '11999999999'
          }
        },
        back_urls: {
          success: `${window.location.origin}/order-success`,
          failure: `${window.location.origin}/order-failure`,
          pending: `${window.location.origin}/order-pending`
        },
        auto_return: 'approved',
        external_reference: orderData.orderId
      }

      // Simular resposta do MercadoPago
      return {
        id: `pref_${Date.now()}`,
        init_point: `${window.location.origin}/order-success?preference_id=pref_${Date.now()}`,
        sandbox_init_point: `${window.location.origin}/order-success?preference_id=pref_${Date.now()}`
      }
    } catch (error) {
      console.error('Erro ao criar preferência:', error)
      throw error
    }
  },

  // Processar pagamento via PIX
  processPixPayment: async (orderData) => {
    try {
      const preferenceData = {
        items: orderData.items.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL'
        })),
        payer: {
          name: orderData.customer.name,
          email: orderData.customer.email
        },
        payment_methods: {
          excluded_payment_methods: [
            { id: 'credit_card' },
            { id: 'debit_card' }
          ],
          excluded_payment_types: [
            { id: 'ticket' },
            { id: 'atm' }
          ],
          installments: 1
        },
        back_urls: {
          success: `${window.location.origin}/order-success`,
          failure: `${window.location.origin}/order-failure`,
          pending: `${window.location.origin}/order-pending`
        },
        auto_return: 'approved',
        external_reference: orderData.orderId
      }

      // Simular resposta do MercadoPago para PIX
      return {
        id: `pix_${Date.now()}`,
        init_point: `${window.location.origin}/order-success?payment_method=pix&preference_id=pix_${Date.now()}`,
        sandbox_init_point: `${window.location.origin}/order-success?payment_method=pix&preference_id=pix_${Date.now()}`
      }
    } catch (error) {
      console.error('Erro ao processar pagamento PIX:', error)
      throw error
    }
  },

  // Processar pagamento via Boleto
  processBoletoPayment: async (orderData) => {
    try {
      const preferenceData = {
        items: orderData.items.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL'
        })),
        payer: {
          name: orderData.customer.name,
          email: orderData.customer.email
        },
        payment_methods: {
          excluded_payment_methods: [
            { id: 'credit_card' },
            { id: 'debit_card' }
          ],
          excluded_payment_types: [
            { id: 'pix' },
            { id: 'atm' }
          ],
          installments: 1
        },
        back_urls: {
          success: `${window.location.origin}/order-success`,
          failure: `${window.location.origin}/order-failure`,
          pending: `${window.location.origin}/order-pending`
        },
        auto_return: 'approved',
        external_reference: orderData.orderId
      }

      // Simular resposta do MercadoPago para Boleto
      return {
        id: `boleto_${Date.now()}`,
        init_point: `${window.location.origin}/order-success?payment_method=boleto&preference_id=boleto_${Date.now()}`,
        sandbox_init_point: `${window.location.origin}/order-success?payment_method=boleto&preference_id=boleto_${Date.now()}`
      }
    } catch (error) {
      console.error('Erro ao processar pagamento Boleto:', error)
      throw error
    }
  },

  // Calcular frete
  calculateShipping: async (zipCode, items) => {
    try {
      // Simular cálculo de frete
      const baseShipping = 15.00
      const weightFactor = items.reduce((total, item) => total + (item.quantity * 0.5), 0)
      const shippingCost = baseShipping + (weightFactor * 2)
      
      return {
        cost: shippingCost,
        estimatedDays: 3,
        carrier: 'Correios'
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error)
      return {
        cost: 15.00,
        estimatedDays: 3,
        carrier: 'Correios'
      }
    }
  }
}