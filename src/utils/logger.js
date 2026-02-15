/**
 * Sistema de Logging Profissional
 * 
 * Em desenvolvimento: mostra todos os logs
 * Em produção: remove automaticamente os logs
 */

const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development'

export const logger = {
  /**
   * Log de informações gerais
   * @param {...any} args - Argumentos para log
   */
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },

  /**
   * Log de erros (sempre aparece, mesmo em produção)
   * @param {...any} args - Argumentos para log de erro
   */
  error: (...args) => {
    console.error(...args)
  },

  /**
   * Log de avisos
   * @param {...any} args - Argumentos para log de aviso
   */
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },

  /**
   * Log de debug (apenas desenvolvimento)
   * @param {...any} args - Argumentos para debug
   */
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  },

  /**
   * Log de informações (apenas desenvolvimento)
   * @param {...any} args - Argumentos para info
   */
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args)
    }
  }
}

export default logger




