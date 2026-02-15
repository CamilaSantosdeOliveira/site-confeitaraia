import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Breadcrumbs from './components/Breadcrumbs'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import OrderSuccess from './pages/OrderSuccess'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { CartProvider } from './contexts/CartContext'
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
                      
                      <Route 
                        path="/admin" 
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Admin />
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
                    </Routes>
                  </AnimatePresence>
                </main>
                
                <Footer />
              </div>
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
