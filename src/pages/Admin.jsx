import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AdminDashboard from './Admin/AdminDashboard'
import AdminProducts from './Admin/AdminProducts'
import AdminOrders from './Admin/AdminOrders'
import AdminCustomers from './Admin/AdminCustomers'

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Produtos' },
    { id: 'orders', icon: '🛒', label: 'Pedidos' },
    { id: 'customers', icon: '👥', label: 'Clientes' }
  ]

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setSidebarOpen(false) // Fechar sidebar no mobile ao selecionar
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <div className="lg:hidden bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Painel Admin</h2>
              <p className="text-xs text-gray-500">Doçuras & Sabores</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop e Mobile */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 sm:p-5 lg:p-6 pt-12 lg:pt-12 h-full overflow-y-auto">
            {/* Logo Desktop */}
            <div className="hidden lg:flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Painel Admin</h2>
                <p className="text-sm text-gray-500">Doçuras & Sabores</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Conteúdo Principal */}
        <div className="flex-1 w-full lg:w-auto p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 pt-3 sm:pt-4 md:pt-6 lg:pt-12 overflow-x-hidden">
          {activeSection === 'dashboard' && <AdminDashboard />}
          {activeSection === 'products' && <AdminProducts />}
          {activeSection === 'orders' && <AdminOrders />}
          {activeSection === 'customers' && <AdminCustomers />}
        </div>
      </div>
    </div>
  )
}

export default Admin
