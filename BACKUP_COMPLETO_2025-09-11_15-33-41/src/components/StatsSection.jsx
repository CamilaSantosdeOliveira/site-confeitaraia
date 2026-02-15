import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Cake, Star, Award } from 'lucide-react'

const StatsSection = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    products: 0,
    rating: 0,
    awards: 0
  })

  const stats = [
    {
      icon: Users,
      value: 2500,
      label: 'Clientes Satisfeitos',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Cake,
      value: 150,
      label: 'Produtos Únicos',
      color: 'from-pink-500 to-yellow-500'
    },
    {
      icon: Star,
      value: 4.9,
      label: 'Avaliação Média',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      value: 15,
      label: 'Prêmios Conquistados',
      color: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    const animateCounts = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      stats.forEach((stat, index) => {
        const targetValue = stat.value
        let currentValue = 0
        const increment = targetValue / steps

        const timer = setInterval(() => {
          currentValue += increment
          if (currentValue >= targetValue) {
            currentValue = targetValue
            clearInterval(timer)
          }

          setCounts(prev => ({
            ...prev,
            [Object.keys(counts)[index]]: parseFloat(currentValue.toFixed(1))
          }))
        }, stepDuration)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounts()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">Números</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados que comprovam nossa excelência e dedicação
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {counts[Object.keys(counts)[index]]}
                {stat.label.includes('Avaliação') && <span className="text-2xl">/5</span>}
                {stat.label.includes('Clientes') && <span className="text-2xl">+</span>}
                {stat.label.includes('Produtos') && <span className="text-2xl">+</span>}
                {stat.label.includes('Prêmios') && <span className="text-2xl">+</span>}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

