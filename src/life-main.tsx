import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import DirectionProvider from './DirectionProvider'
import ErrorBoundary from './components/ErrorBoundary'
import LifeApp from './LifeApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <DirectionProvider>
            <LifeApp />
          </DirectionProvider>
        </Suspense>
      </I18nextProvider>
    </ErrorBoundary>
  </StrictMode>,
)
