import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<ThemeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</HelmetProvider>
	</React.StrictMode>,
)
