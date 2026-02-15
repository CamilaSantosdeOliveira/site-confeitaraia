import React, { useState } from 'react'
import AdminDashboard from './Admin/AdminDashboard'
import AdminProducts from './Admin/AdminProducts'
import AdminOrders from './Admin/AdminOrders'
import AdminCustomers from './Admin/AdminCustomers'

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Painel Admin</h2>
                <p className="text-sm text-gray-500">Doçuras & Sabores</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === 'dashboard' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveSection('products')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === 'products' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <span className="text-lg">📦</span>
                <span>Produtos</span>
              </button>
              
              <button
                onClick={() => setActiveSection('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === 'orders' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <span className="text-lg">🛒</span>
                <span>Pedidos</span>
              </button>
              
              <button
                onClick={() => setActiveSection('customers')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === 'customers' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <span className="text-lg">👥</span>
                <span>Clientes</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-8">
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
