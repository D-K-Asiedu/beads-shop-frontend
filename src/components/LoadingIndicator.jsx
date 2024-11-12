import styled, { keyframes } from "styled-components"

function LoadingIndicator(props) {
  return (
    <StyledSpinner scale={props.scale}>
      <StyledLoadingIndicator {...props} />
    </StyledSpinner>
  )
}

export default LoadingIndicator

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const StyledLoadingIndicator = styled.div`
  width: ${props => `${props.scale ?? 1}em`};
  height: ${props => `${props.scale ?? 1}em`};
  border-radius: 50%;
  border: ${props => `${(props.scale ?? 1) * 2}px`} solid #ddd;
  border-top-color: #aaa;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} ${props => props.duration ?? "1s"} linear infinite;
  }
`

const StyledSpinner = styled.div`
  display: inline-block;
  width: ${props => `${props.scale ?? 1}em`};
  height: ${props => `${props.scale ?? 1}em`};
`