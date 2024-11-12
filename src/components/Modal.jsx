import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function Modal({ children, show, onShow, onClose, parentElement = document.body }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      if(onShow !== undefined) onShow()
    } else {
      document.body.style.overflow = 'auto'
      if(onClose !== undefined) onClose()
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [show])
  
  if(!show) return null
  return createPortal(<>{children}</>, parentElement)
}

export default Modal