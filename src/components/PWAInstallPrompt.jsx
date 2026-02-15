import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Detectar sistema operacional
    const userAgent = window.navigator.userAgent.toLowerCase()
    const iOS = /iphone|ipad|ipod/.test(userAgent)
    const android = /android/.test(userAgent)
    
    setIsIOS(iOS)
    setIsAndroid(android)

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration)
        })
        .catch((error) => {
          console.log('❌ Erro ao registrar Service Worker:', error)
        })
    }

    // Capturar evento de instalação (Chrome/Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Mostrar prompt após 5 segundos (tempo para usuário ver o site primeiro)
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Verificar se foi instalado
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Mostrar prompt de instalação
      deferredPrompt.prompt()
      
      // Aguardar resposta do usuário
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('✅ Usuário aceitou instalação')
      } else {
        console.log('❌ Usuário rejeitou instalação')
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleIOSInstall = () => {
    // Instruções para iOS
    alert(
      'Para instalar no iPhone/iPad:\n\n' +
      '1. Toque no botão Compartilhar (⬆️) na parte inferior\n' +
      '2. Role para baixo e toque em "Adicionar à Tela de Início"\n' +
      '3. Toque em "Adicionar" no canto superior direito'
    )
  }

  const handleAndroidInstall = () => {
    // Instruções para Android
    alert(
      'Para instalar no Android:\n\n' +
      '1. Toque no menu (⋮) no canto superior direito\n' +
      '2. Selecione "Adicionar à tela inicial" ou "Instalar app"\n' +
      '3. Confirme a instalação'
    )
  }

  // Não mostrar se já estiver instalado ou não for mobile
  if (isInstalled || (!isIOS && !isAndroid && !deferredPrompt)) {
    return null
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl shadow-2xl border-2 border-pink-300 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">📱 Instalar App</h3>
                  <p className="text-xs text-gray-600">Acesse mais rápido, mesmo offline!</p>
                </div>
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all"
              >
                <Download size={18} />
                Instalar Agora
              </button>
            )}

            {isIOS && (
              <button
                onClick={handleIOSInstall}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all mt-2"
              >
                <Smartphone size={18} />
                Como Instalar (iOS)
              </button>
            )}

            {isAndroid && !deferredPrompt && (
              <button
                onClick={handleAndroidInstall}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all"
              >
                <Smartphone size={18} />
                Como Instalar (Android)
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PWAInstallPrompt

