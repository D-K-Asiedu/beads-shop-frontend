import styled, {css} from "styled-components"

export const StyledPage = styled.div`
  min-height: 100dvh;
`

export const StyledHeader = styled.header`
  position: sticky;
  z-index: 100;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;

  & > h1 {
    font-family: ${props => props.theme.font.exo};
    font-size: 1.75rem;
    font-weight: bold;
  }
`

export const StyledFlex = styled.div`
  ${props => props.direction && css`flex-direction: ${props.direction};`}
  ${props => props.gap && css`gap: ${props.gap};`}
  ${props => props.justifyContent && css`justify-content: ${props.justifyContent};`}
  display: flex;
  ${props => props.alignItems && css`align-items: ${props.alignItems};`}
`
