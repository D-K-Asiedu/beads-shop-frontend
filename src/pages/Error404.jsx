import styled from "styled-components"
import { StyledPage } from "../styled/layout"

export const Error404 = () => {
  return (
    <StyledError404>
      <h1>404</h1>
      <p>The requested url does not exist</p>
      <a href="/">Go to homepage</a>
    </StyledError404>
  )
}

export default Error404

const StyledError404 = styled(StyledPage)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;
  text-align: center;

  & > h1 {
    font-family: ${props => props.theme.font.exo2};
    font-size: 10rem;
    font-weight: bold;
  }

  & > p {
    font-size: 1.5rem;
  }

  & > a {
    padding: 0.5em 1em;
    margin-block: 1em;
    border-radius: 0.25em;
    font-weight: bold;
    background-color: #000;
    color: #fff;
  }
`