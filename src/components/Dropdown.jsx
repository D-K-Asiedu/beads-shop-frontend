import { useState, createContext, useContext, useRef } from "react"
import useOnClickOutside from "../hooks/useOnClickOutside"

function Dropdown({ children }) {
  const buttonRef = useRef(null)
  const contentRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false)

  function toggleDropdown(){
    setShowDropdown(prev => !prev)
  }

  useOnClickOutside([buttonRef, contentRef], () => {
    setShowDropdown(false)
  })

  const style = {
    position: "relative"
  }

  const dropdownChildren = typeof children === "function"
    ? children({style})
    : children

  return (
    <DropdownContext.Provider 
      value={{buttonRef, contentRef, showDropdown, toggleDropdown}}
    >{dropdownChildren}</DropdownContext.Provider>
  )
}

Dropdown.button = function DropdownButton({ children }) {
  const { toggleDropdown, buttonRef } = useContext(DropdownContext)
  
  function onClick(){
    toggleDropdown()
  }

  return children({onClick, ref: buttonRef})
}

Dropdown.content = function DropdownContent({ children }) {
  const { showDropdown, contentRef } = useContext(DropdownContext)

  if(!showDropdown) return null
  return children({ref: contentRef})
}

export default Dropdown

const DropdownContext = createContext({buttonRef: null, contentRef: null, showDropdown: false, toggleDropdown: () => {}}) 