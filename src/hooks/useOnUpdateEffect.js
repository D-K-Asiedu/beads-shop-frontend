import { useRef, useEffect } from "react"

export default function useOnUpdateEffect(fn, deps) {
  const firstRenderRef = useRef(true)
  
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    
    fn()
  }, [deps])
}
