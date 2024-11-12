import styled from "styled-components";
import { StyledPage as _StyledPage } from "./layout";

export const StyledPage = styled(_StyledPage)`
  display: grid;
  grid-template-rows: auto 1fr;
`

export const StyledIconButton = styled.button`
  padding: ${props => props.padding || "0.1em"};
  border-radius: 0.25em;
  background-color: #0000;
  color: ${props => props.color ?? "#333"};
  height: ${props => props.size || "1.75em"};
  aspect-ratio: 1;

  &:hover, &:focus-visible {
    background-color: ${props => props.bgColor ?? "#eee"};
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`

export const StyledSearchInput = styled.input`
  width: min(60vw, 20em);
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 0.25em;
  padding: 0.5em;
`

export const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.25em);
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --arrow-size: 1em;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: auto;
    right: 0.25em;
    pointer-events: none;
  }
  
  &::before {
    top: calc(-1 * var(--arrow-size));

    border: calc(var(--arrow-size) / 2) solid #0000;
    border-bottom: calc(var(--arrow-size) / 2) solid #ccc;
  }

  &::after {
    top: calc(-1 * var(--arrow-size) + 2px);

    border: calc(var(--arrow-size) / 2) solid #0000;
    border-bottom: calc(var(--arrow-size) / 2) solid #fff;
  }
`

export const StyledDropdownList = styled.ul`
  padding: 0.25em;
  min-width: ${props => props.maxWidth ?? "10em"};

  & > li > * {
    padding-block: 0.15em;
    padding-inline: 0.5em;
    width: 100%;
  }

  & > li > .emphasis {
    color: ${props => props.theme.color.accentDark};
    font-family: ${props => props.theme.font.exo};
  }
  
  & > li > button,
  & > li > a {
    display: block;
    padding-block: 0.25em;
    padding-inline: 1em;
    border-radius: 0.25em;
    text-align: left;
    background: #0000;
    color: #333;

    &:hover {
      background: #eee;
    }
  }

  & > .hr {
    margin-block: 0.5em;
    margin-inline: -0.25em;
    border: 1px solid #ddd;
  }
`

export const StyledCartDropdownContent = styled.div`
  padding: 0.5em;
  min-width: min(17.5em, 100vw);

  & > h3 {
    font-family: ${props => props.theme.font.exo};
    font-size: 1.25rem;
    font-weight: bold;
  }

  .dim-text {
    color: #888;
  }

  & a.btn {
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
  }

  & a.link {
    color: ${props => props.theme.color.accent};
    
    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }
`

export const StyledCartDropdownItem = styled.article`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto auto;
  gap: 2.5em;
  padding-block: 0.5em;
`

export const StyledProductsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(10em + 0.5vw), 1fr));
  justify-items: center;
  gap: 1em;
  padding-block: 0.5em;
`

export const StyledProductCard = styled.article`
  width: 100%;
  max-width: 15em;
  padding: 0.5em;
  border-radius: 0.25em;
  position: relative;
  z-index: 1;
  transition: background-color 150ms;

  &:hover,
  &:focus-within {
    background-color: #eee;
  }

  & > img {
    width: 100%;
    aspect-ratio: 1;
  }

  & > h3 {
    font-family: ${props => props.theme.font.exo};
  }
`

export const StyledDetailsButton = styled.button`
  position: absolute;
  inset: 0;
  background-color: #0000;
  border-radius: inherit;
`

export const StyledPrice = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
`

export const StyledButton = styled.button`
  padding-block: 0.25em;
  border-radius: 0.25em;
  font-weight: bold;
  width: 100%;
`

export const StyledProductModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-content: center;
  background-color: #000a;

  & > article {
    border-radius: 0.25em;
    padding: 0.5em;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: min(90vw, 20em);
    position: relative;

    & > img {
      width: 100%;
      aspect-ratio: 1;
    }

    & > h3 {
      font-family: ${props => props.theme.font.exo};
      font-weight: bold;
      margin-block: 1em 0.5em;
    }

    & > .cart-btn {
      margin-top: 1em;
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
    }

    & > .close-btn {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      padding: 0.1em;
      border-radius: 0.25em;
      background-color: #0000;
      color: #333;
      height: 1.75em;
      aspect-ratio: 1;

      &:hover, &:focus-visible {
        background-color: #eee;
      }

      & > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`