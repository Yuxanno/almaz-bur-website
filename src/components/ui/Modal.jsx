import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, Phone } from "lucide-react"

export function Modal({ isOpen, onClose, type, title, message, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'error':
        return <AlertCircle className="w-16 h-16 text-red-500" />
      case 'info':
        return <Phone className="w-16 h-16 text-blue-500" />
      default:
        return null
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md ${getBgColor()} rounded-2xl shadow-2xl border-2 animate-fade-in-up`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            {getIcon()}
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          {children}
          
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Tushunarli
          </button>
        </div>
      </div>
    </div>
  )
}
