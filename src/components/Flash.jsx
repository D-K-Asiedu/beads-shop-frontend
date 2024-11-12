import { useState } from "react"
import styled, { css, keyframes } from "styled-components"

import { IoIosClose } from "react-icons/io"

function Flash({ controller, fullWidth }) {
  const { showFlash, handleHideFlash, flashParams } = controller._internal

  function handleCustomAction(actionCallback){
    return () => {
      actionCallback()
      handleHideFlash()
    }
  }
  
  if(!showFlash) return null
  return (
    <StyledFlash 
      color={flashParams.color} 
      bgColor={flashParams.bgColor} 
      fullWidth={fullWidth}
      key={flashParams.message}
    >
      <p>{flashParams.message}</p>

      {flashParams.action !== null
        ? (
          <button className="action-btn" onClick={handleCustomAction(flashParams.action.callback)}>{flashParams.action.title}</button>
        )
        : (
          <button className="close-btn" onClick={handleHideFlash}>
            <IoIosClose />
          </button>
        )
      }
    </StyledFlash>
  )
}

export default Flash

export function useFlash() {
  const [showFlash, setShowFlash] = useState(false)
  const [flashParams, setFlashParams] = useState({
    message: "",
    color: "",
    bgColor: "",
    action: null
  })

  function showInfo(message, action){
    showMessage(message, variants.info, action)
  }

  function showSuccess(message, action){
    showMessage(message, variants.success, action)
  }

  function showError(message, action){
    showMessage(message, variants.error, action)
  }

  function showMessage(message, params = variants.info, action = null){
    setShowFlash(true)
    setFlashParams({
      message,
      ...params,
      action
    })
  }

  function handleHideFlash(){
    setShowFlash(false)
    setFlashParams({
      message: "",
      color: "",
      bgColor: "",
      action: null
    })
  }

  return {
    _internal: {
      showFlash,
      handleHideFlash,
      flashParams
    },
    showInfo,
    showSuccess,
    showError
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledFlash = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.color};
  ${props => props.fullWidth 
    ? css`
      border-left: none;
      border-right: none;
    `
    : null
  }
  border-radius: ${props => props.fullWidth ? "0em": "0.25em"};
  padding: 0.5em;
  background-color: ${props => props.bgColor};
  animation: ${fadeIn} 0.1s;

  & > p {
    padding: 0.5em;
    font-size: 0.875em;
  }

  & > .action-btn {
    padding-inline: 0.5em;
    padding-block: 0.15em;
    border-radius: 0.25em;
    border: 1px solid ${props => props.color};
    font-size: 0.875rem;
  }

  & > .close-btn {
    padding: 0.5em;
    border-radius: 0.25em;
    background-color: #0000;
    color: ${props => props.color};
    height: 2.5em;
    aspect-ratio: 1;

    &:hover, &:focus-visible {
      background-color: ${props => props.color};
      color: #fff;
      opacity: 0.75;
    }

    & > svg {
      width: 100%;
      height: 100%;
    }
  }
`

const variants = {
  info: {
    color: "#0051ff",
    bgColor: "#cbe1ff"
  },
  success: {
    color: "#00c21a",
    bgColor: "#bcffbc"
  },
  error: {
    color: "#ee0404",
    bgColor: "#ffd6d6"
  }
}