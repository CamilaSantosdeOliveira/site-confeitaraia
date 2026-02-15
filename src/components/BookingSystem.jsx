import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, Phone, MessageSquare } from 'lucide-react'

const BookingSystem = () => {
  const [booking, setBooking] = useState({
    service: '',
    date: '',
    time: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [selectedDate, setSelectedDate] = useState(null)

  const services = [
    {
      id: 'birthday-party',
      name: 'Festa de Aniversário',
      description: 'Decoração completa para festa de aniversário',
      price: 150.00,
      duration: '4 horas'
    },
    {
      id: 'wedding',
      name: 'Casamento',
      description: 'Decoração elegante para casamento',
      price: 500.00,
      duration: '8 horas'
    },
    {
      id: 'corporate',
      name: 'Evento Corporativo',
      description: 'Decoração profissional para eventos empresariais',
      price: 300.00,
      duration: '6 horas'
    },
    {
      id: 'baby-shower',
      name: 'Baby Shower',
      description: 'Decoração temática para baby shower',
      price: 200.00,
      duration: '5 horas'
    }
  ]

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  const generateCalendarDays = () => {
    const days = []
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    
    // Primeiro dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1)
    // Último dia do mês
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    
    // Dias do mês anterior para completar a primeira semana
    const firstDayOfWeek = firstDay.getDay()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }
    
    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i)
      days.push({
        date: date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
      })
    }
    
    // Dias do próximo mês para completar a última semana
    const lastDayOfWeek = lastDay.getDay()
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }
    
    return days
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setBooking({...booking, date: date.toISOString().split('T')[0]})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Agendamento:', booking)
    // Aqui seria enviado para o backend
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Agende seu Evento
        </h1>
        <p className="text-gray-600">
          Reserve nossa confeitaria para seu evento especial
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Selecione a Data
          </h2>
          
          <div className="mb-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-gray-600 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div
                  key={index}
                  onClick={() => day.isCurrentMonth && handleDateSelect(day.date)}
                  className={`p-2 text-center cursor-pointer rounded-lg transition-all ${
                    day.isSelected
                      ? 'bg-purple-600 text-white'
                      : day.isToday
                      ? 'bg-purple-100 text-purple-600 font-bold'
                      : day.isCurrentMonth
                      ? 'hover:bg-gray-100'
                      : 'text-gray-300'
                  }`}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
              <span>Selecionado</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-100 rounded mr-2"></div>
              <span>Hoje</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-6">
          {/* Service Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tipo de Evento</h3>
            <div className="space-y-3">
              {services.map(service => (
                <div
                  key={service.id}
                  onClick={() => setBooking({...booking, service: service.id})}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    booking.service === service.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-sm text-gray-500">Duração: {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">R$ {service.price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Horário Preferido
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map(time => (
                <div
                  key={time}
                  onClick={() => setBooking({...booking, time})}
                  className={`p-3 text-center border-2 rounded-lg cursor-pointer transition-all ${
                    booking.time === time 
                      ? 'border-purple-500 bg-purple-50 text-purple-600' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Guest Count */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Número de Convidados
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBooking({...booking, guests: Math.max(1, booking.guests - 1)})}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
              >
                -
              </button>
              <span className="text-2xl font-bold w-16 text-center">{booking.guests}</span>
              <button
                onClick={() => setBooking({...booking, guests: booking.guests + 1})}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Informações de Contato
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={booking.name}
                  onChange={(e) => setBooking({...booking, name: e.target.value})}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={booking.email}
                  onChange={(e) => setBooking({...booking, email: e.target.value})}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Telefone</label>
                <input
                  type="tel"
                  value={booking.phone}
                  onChange={(e) => setBooking({...booking, phone: e.target.value})}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Mensagem (Opcional)</label>
                <textarea
                  value={booking.message}
                  onChange={(e) => setBooking({...booking, message: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Detalhes especiais sobre seu evento..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!booking.service || !booking.date || !booking.time || !booking.name || !booking.email || !booking.phone}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agendar Evento
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      {booking.service && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4">Resumo do Agendamento</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p><strong>Evento:</strong> {services.find(s => s.id === booking.service)?.name}</p>
              <p><strong>Data:</strong> {booking.date}</p>
              <p><strong>Horário:</strong> {booking.time}</p>
              <p><strong>Convidados:</strong> {booking.guests}</p>
            </div>
            <div>
              <p><strong>Nome:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Telefone:</strong> {booking.phone}</p>
              <p><strong>Valor:</strong> R$ {services.find(s => s.id === booking.service)?.price.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default BookingSystem












