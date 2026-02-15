import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, Gift } from 'lucide-react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envio
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl text-center"
      >
        <CheckCircle size={48} className="mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Inscrição Confirmada!</h3>
        <p className="text-green-100">
          Você receberá nossas novidades e ofertas exclusivas em breve!
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white p-8 rounded-2xl relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 p-3 rounded-full">
            <Gift size={32} />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-center mb-2">
          Receba Ofertas Exclusivas!
        </h3>
        <p className="text-purple-100 text-center mb-6">
          Inscreva-se para receber 10% de desconto na primeira compra e ficar por dentro das novidades
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-purple-600 font-semibold py-4 px-6 rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Inscrever-se</span>
              </>
            )}
          </motion.button>
        </form>

        <p className="text-xs text-purple-200 text-center mt-4">
          Prometemos não enviar spam. Você pode cancelar a qualquer momento.
        </p>
      </div>
    </motion.div>
  )
}

export default NewsletterSignup












