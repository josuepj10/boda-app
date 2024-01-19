import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { colorTheme } from './colorTheme';

export const AppTheme = ( { children } ) => {
  return (

    <ThemeProvider theme={ colorTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      {children}

      <CssBaseline />
    </ThemeProvider>

  )
}
