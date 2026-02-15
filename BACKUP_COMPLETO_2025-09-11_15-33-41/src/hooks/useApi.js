import { useState, useEffect } from 'react'

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMock, setIsMock] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await apiCall()
        
        if (response.isMock) {
          setIsMock(true)
          console.log('⚠️ Usando dados mock - Backend não disponível')
        }
        
        setData(response.data)
      } catch (err) {
        console.error('Erro na API:', err)
        setError(err.message || 'Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error, isMock }
}

export const useApiCallback = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = async (apiCall) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiCall()
      
      if (response.isMock) {
        console.log('⚠️ Usando dados mock - Backend não disponível')
      }
      
      return response
    } catch (err) {
      console.error('Erro na API:', err)
      setError(err.message || 'Erro na operação')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error }
}

