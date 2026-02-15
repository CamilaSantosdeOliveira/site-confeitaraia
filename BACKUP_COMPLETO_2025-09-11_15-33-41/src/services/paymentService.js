import api from './api'

// Simulação de dados de pagamento para demonstração
const mockPaymentData = {
  pix: {
    qrCode: '00020126580014br.gov.bcb.pix0136a629532e-7693-4849-af03-61d7b5d90000520400005303986540599.905802BR5913Doçuras Sabores6008São Paulo62070503***6304',
    expiration: new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
  },
  boleto: {
    code: '23793.38128 60047.173306 00000.063105 9 84410026000',
    expiration: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 dias
  }
}

class PaymentService {
  // Gerar PIX
  async generatePix(amount, description = 'Pagamento Doçuras & Sabores') {
    try {
      // Em produção, isso seria uma chamada real para a API do gateway
      const response = await api.post('/payments/pix', {
        amount,
        description,
        expires_in: 1800 // 30 minutos
      })
      
      return response.data
    } catch (error) {
      console.error('Erro ao gerar PIX:', error)
      // Fallback para dados mock
      return {
        success: true,
        pix: {
          qrCode: mockPaymentData.pix.qrCode,
          expiration: mockPaymentData.pix.expiration,
          amount,
          description
        }
      }
    }
  }

  // Gerar Boleto
  async generateBoleto(amount, customerData) {
    try {
      const response = await api.post('/payments/boleto', {
        amount,
        customer: customerData,
        expires_in: 259200 // 3 dias
      })
      
      return response.data
    } catch (error) {
      console.error('Erro ao gerar boleto:', error)
      // Fallback para dados mock
      return {
        success: true,
        boleto: {
          code: mockPaymentData.boleto.code,
          expiration: mockPaymentData.boleto.expiration,
          amount,
          customer: customerData
        }
      }
    }
  }

  // Processar pagamento com cartão
  async processCardPayment(paymentData) {
    try {
      const response = await api.post('/payments/card', {
        card_number: paymentData.cardNumber,
        card_holder: paymentData.cardHolder,
        card_expiry: paymentData.cardExpiry,
        card_cvv: paymentData.cardCvv,
        amount: paymentData.amount,
        installments: paymentData.installments || 1,
        customer: paymentData.customer
      })
      
      return response.data
    } catch (error) {
      console.error('Erro ao processar pagamento com cartão:', error)
      // Simulação de processamento
      return new Promise((resolve) => {
        setTimeout(() => {
          const success = Math.random() > 0.1 // 90% de sucesso
          resolve({
            success,
            transaction_id: success ? `TXN_${Date.now()}` : null,
            message: success ? 'Pagamento aprovado' : 'Pagamento recusado',
            amount: paymentData.amount
          })
        }, 2000)
      })
    }
  }

  // Verificar status do PIX
  async checkPixStatus(transactionId) {
    try {
      const response = await api.get(`/payments/pix/${transactionId}/status`)
      return response.data
    } catch (error) {
      console.error('Erro ao verificar status do PIX:', error)
      // Simulação de verificação
      return {
        status: 'pending',
        paid: false,
        amount: 0
      }
    }
  }

  // Verificar status do Boleto
  async checkBoletoStatus(transactionId) {
    try {
      const response = await api.get(`/payments/boleto/${transactionId}/status`)
      return response.data
    } catch (error) {
      console.error('Erro ao verificar status do boleto:', error)
      // Simulação de verificação
      return {
        status: 'pending',
        paid: false,
        amount: 0
      }
    }
  }

  // Calcular parcelas
  calculateInstallments(amount, maxInstallments = 12) {
    const installments = []
    
    for (let i = 1; i <= maxInstallments; i++) {
      let installmentAmount = amount / i
      let hasInterest = false
      
      // Aplicar juros a partir da 4ª parcela
      if (i > 3) {
        const interestRate = 0.0199 // 1.99% ao mês
        const totalWithInterest = amount * Math.pow(1 + interestRate, i)
        installmentAmount = totalWithInterest / i
        hasInterest = true
      }
      
      installments.push({
        installments: i,
        amount: installmentAmount,
        total: installmentAmount * i,
        hasInterest,
        interestRate: hasInterest ? 1.99 : 0
      })
    }
    
    return installments
  }

  // Validar dados do cartão
  validateCard(cardData) {
    const errors = {}
    
    // Validar número do cartão (Luhn algorithm)
    if (!this.isValidCardNumber(cardData.cardNumber)) {
      errors.cardNumber = 'Número do cartão inválido'
    }
    
    // Validar data de expiração
    if (!this.isValidExpiry(cardData.cardExpiry)) {
      errors.cardExpiry = 'Data de expiração inválida'
    }
    
    // Validar CVV
    if (!this.isValidCVV(cardData.cardCvv)) {
      errors.cardCvv = 'CVV inválido'
    }
    
    // Validar nome do titular
    if (!cardData.cardHolder || cardData.cardHolder.trim().length < 3) {
      errors.cardHolder = 'Nome do titular é obrigatório'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  // Algoritmo de Luhn para validar número do cartão
  isValidCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(cleanNumber)) return false
    
    let sum = 0
    let isEven = false
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  // Validar data de expiração
  isValidExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false
    
    const [month, year] = expiry.split('/')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    const expMonth = parseInt(month)
    const expYear = parseInt(year)
    
    if (expMonth < 1 || expMonth > 12) return false
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false
    
    return true
  }

  // Validar CVV
  isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv)
  }

  // Formatar número do cartão
  formatCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    const groups = cleanNumber.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleanNumber
  }

  // Formatar data de expiração
  formatExpiry(expiry) {
    const cleanExpiry = expiry.replace(/\D/g, '')
    if (cleanExpiry.length >= 2) {
      return cleanExpiry.slice(0, 2) + '/' + cleanExpiry.slice(2, 4)
    }
    return cleanExpiry
  }

  // Obter bandeira do cartão
  getCardBrand(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      elo: /^(636368|438935|504175|451416|636297)/,
      hipercard: /^(606282|3841)/,
      discover: /^6(?:011|5)/
    }
    
    for (const [brand, pattern] of Object.entries(patterns)) {
      if (pattern.test(cleanNumber)) {
        return brand
      }
    }
    
    return 'unknown'
  }

  // Criar webhook para notificações de pagamento
  async createWebhook(url, events = ['payment.created', 'payment.updated']) {
    try {
      const response = await api.post('/webhooks', {
        url,
        events
      })
      return response.data
    } catch (error) {
      console.error('Erro ao criar webhook:', error)
      return { success: false, error: error.message }
    }
  }

  // Processar notificação de webhook
  processWebhook(payload, signature) {
    try {
      // Em produção, validar a assinatura do webhook
      const isValidSignature = this.validateWebhookSignature(payload, signature)
      
      if (!isValidSignature) {
        throw new Error('Assinatura inválida')
      }
      
      return {
        success: true,
        event: payload.event,
        data: payload.data
      }
    } catch (error) {
      console.error('Erro ao processar webhook:', error)
      return { success: false, error: error.message }
    }
  }

  // Validar assinatura do webhook (simulação)
  validateWebhookSignature(payload, signature) {
    // Em produção, implementar validação real da assinatura
    return true
  }
}

export default new PaymentService()

