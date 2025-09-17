import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#21cbf3',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  pageProps: { session: any }
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}