import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
@media (prefers-reduced-motion: no-preference) {
  :focus-visible {
      outline: 3px solid ${props => props.theme.color.accentLight};
      transition: outline-offset 150ms ease-out;
    }
    
    :not(:active):focus-visible {
      transition: outline-offset 50ms ease-out;
    }
  }

  :not(:active):focus-visible {
    outline-offset: 0.1em;
  }

  body {
    font-family: ${props => props.theme.font.poppins};
    font-size: 1rem;
  }

  main {
    width: 100%;
    max-width: 75em;
    margin-inline: auto;
  }
`
const sansSerifFallback = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"

export const theme = {
  font: {
    poppins: `Poppins, ${sansSerifFallback}`,
    exo: `'Exo 2', ${sansSerifFallback}`
  },
  color: {
    accent: "#622bff",
    accentDark: "#3c1b9b",
    accentLight: "#a18aff",
  }
}