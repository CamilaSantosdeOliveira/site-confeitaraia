import { motion } from 'framer-motion'

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = {
    card: (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded-full mb-3 w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded-full mb-2 w-1/2"></div>
            <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-1/3 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded-full w-16"></div>
              <div className="h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    hero: (
      <div className="relative h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center animate-pulse">
            <div className="h-16 bg-white/50 rounded-full mb-8 w-96 mx-auto"></div>
            <div className="h-8 bg-white/50 rounded-full mb-4 w-80 mx-auto"></div>
            <div className="h-6 bg-white/50 rounded-full mb-8 w-64 mx-auto"></div>
            <div className="flex justify-center space-x-4">
              <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-32"></div>
              <div className="h-12 bg-white/50 rounded-full w-32"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    grid: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="animate-pulse">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded-full mb-3 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded-full mb-2 w-1/2"></div>
                  <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-1/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
    list: (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="animate-pulse flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full w-16"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return skeletons[type] || skeletons.card
}

export default LoadingSkeleton
