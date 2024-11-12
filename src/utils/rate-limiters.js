export function throttle(func, wait) {
  let timeout
  let latestArgs = null
  let canInvoke = true

  return (...args) => {
    latestArgs = args

    if(!canInvoke) return

    func(...latestArgs)
    latestArgs = null
    canInvoke = false
    
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      canInvoke = true

      if(latestArgs != null) {
        func(...latestArgs)
        latestArgs = null
      }
    }, wait)
  }
}

export function debounce(func, wait) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}