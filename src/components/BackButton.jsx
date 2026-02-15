import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const BackButton = ({ 
  to = null, 
  text = "Voltar", 
  className = "",
  showOnMobile = true 
}) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1) // Volta para a página anterior no histórico
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -5 }}
      onClick={handleBack}
      className={`
        inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 
        transition-all duration-200 font-medium group
        ${showOnMobile ? 'block' : 'hidden md:block'}
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span>{text}</span>
    </motion.button>
  )
}

export default BackButton










