import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Breadcrumbs from './components/Breadcrumbs'
import ErrorBoundary from './components/ErrorBoundary'
import ChatWidget from './components/ChatWidget'
import ScrollToTop from './components/ScrollToTop'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutWithPayment from './pages/CheckoutWithPayment'
import OrderTracking from './pages/OrderTracking'
import OrderSuccess from './pages/OrderSuccess'
import OrderConfirmed from './pages/OrderConfirmed'
import Admin from './pages/Admin'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import ClientArea from './pages/ClientArea'
import OrderHistory from './pages/OrderHistory'
import Reviews from './pages/Reviews'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import { CartProvider } from './contexts/CartContextReal'
import { AuthProvider } from './contexts/AuthContext'
import NotificationProvider from './components/NotificationSystem'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <ScrollToTop />
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
                <Header />
                <Breadcrumbs />
                
                <main className="flex-1">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route 
                        path="/" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Home />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/menu" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Menu />
                          </motion.div>
                        } 
                      />
                      
                      
                      <Route 
                        path="/about" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <About />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/contact" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Contact />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/cart" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Cart />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/checkout" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Checkout />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/checkout-payment" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckoutWithPayment />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/order-success" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OrderSuccess />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/pedido-confirmado" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OrderConfirmed />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/acompanhar-pedido" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OrderTracking />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/order/:orderId" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OrderTracking />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/order/success" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <OrderSuccess />
                          </motion.div>
                        } 
                      />
                      
                      {/* ROTA SECRETA PARA ADMIN - ACESSO OCULTO */}
                      <Route 
                        path="/painel-admin-secreto" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProtectedRoute requireAdmin={true}>
                              <Admin />
                            </ProtectedRoute>
                          </motion.div>
                        } 
                      />
                      
                      {/* ROTA ADMIN PADRÃO (REDIRECIONA) */}
                      <Route 
                        path="/admin" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProtectedRoute requireAdmin={true}>
                              <Admin />
                            </ProtectedRoute>
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/login" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Login />
                          </motion.div>
                        } 
                      />
                      
                      {/* LOGIN ADMIN - ACESSO SECRETO */}
                      <Route 
                        path="/admin-login" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AdminLogin />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/meus-pedidos" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProtectedRoute>
                              <OrderHistory />
                            </ProtectedRoute>
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/minha-area" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ClientArea />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/avaliacoes" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Reviews />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/faq" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FAQ />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/blog" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Blog />
                          </motion.div>
                        } 
                      />
                    </Routes>
                  </AnimatePresence>
                </main>
                
                <Footer />
                
                {/* Chat Widget */}
                <ChatWidget />
                <PWAInstallPrompt />
              </div>
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
