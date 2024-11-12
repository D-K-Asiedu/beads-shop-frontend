import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledPage as _StyledPage } from './layout'

export const StyledPage = styled(_StyledPage)`
  display: grid;
  align-items: center;
`

export const StyledMain = styled.main`
  width: 100%;
  max-width: 26em;
  padding-inline: 2em;
  margin-inline: auto;
`

export const StyledTitle = styled.h1`
  font-family: ${props => props.theme.font.exo};
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.75em;
`

export const StyledForm = styled.form`
  display: grid;
  gap: 1em;
`

export const StyledFormField = styled.div`
  display: grid;
  gap: 0.25em;

  & > label {
    display: block;
    font-size: 0.875rem;
    font-weight: bold;
    color: #333;
  }

  & > input {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #eee;
    border-radius: 0.25em;
    padding: 0.5em;
  }
`

export const StyledButton = styled.button`
  padding: 0.75em 1.5em;
  border-radius: 0.25em;
  background-color: ${props => props.theme.color.accent};
  color: #fff;
  font-weight: bold;
  width: 100%;
  transition: background-color 150ms;
  display: grid;
  place-content: center;

  &:hover, 
  &:focus-visible {
    background-color: ${props => props.theme.color.accentDark};
  }

  &:disabled {
    background-color: ${props => props.theme.color.accentLight};
  }
`

export const StyledLink = styled(Link)`
  color: ${props => props.theme.color.accent};

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

export const StyledSeparator = styled.div`
  font-size: 0.875rem;
  text-align: center;
  position: relative;
  margin-block: 1.5em;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    width: calc(50% - 2ch);
    background-color: #3e3e3e;
  }

  &::after {
    right: 0px;
  }

  &::before {
    left: 0px;
  }
`

export const StyledDimText = styled.p`
  font-size: 0.875rem;
  color: #888;
`