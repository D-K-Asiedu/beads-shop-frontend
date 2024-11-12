import { Suspense } from 'react'
import AppRoutes from './components/routes/AppRoutes'
import PageLoader from './components/PageLoader'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from './styled'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
