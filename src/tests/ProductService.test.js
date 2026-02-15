import { describe, it, expect, vi } from 'vitest'
import { productService } from '../services/api'

describe('ProductService', () => {
  it('deve retornar lista de produtos', async () => {
    const result = await productService.getAll()
    expect(result).toHaveProperty('data')
    expect(Array.isArray(result.data)).toBe(true)
  })

  it('deve retornar produtos mockados quando backend não disponível', async () => {
    // Simular erro de conexão
    const originalFetch = global.fetch
    global.fetch = vi.fn(() => Promise.reject(new Error('Connection refused')))

    const result = await productService.getAll()
    
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('isMock')
    expect(result.isMock).toBe(true)

    // Restaurar fetch
    global.fetch = originalFetch
  })

  it('deve buscar produto por ID', async () => {
    const result = await productService.getById(1)
    expect(result).toHaveProperty('data')
  })

  it('deve buscar produtos por categoria', async () => {
    const result = await productService.getByCategory('bolos')
    expect(result).toHaveProperty('data')
    expect(Array.isArray(result.data)).toBe(true)
  })

  it('deve fazer busca de produtos', async () => {
    const result = await productService.search('brigadeiro')
    expect(result).toHaveProperty('data')
    expect(Array.isArray(result.data)).toBe(true)
  })
})

