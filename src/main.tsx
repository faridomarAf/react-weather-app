import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme='light'>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
