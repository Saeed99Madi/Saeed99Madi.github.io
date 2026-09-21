import Box from '@mui/material/Box'
import { useDocumentLanguage } from './i18n/useDocumentLanguage'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Projects from './components/Projects'
import TechStack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SkipLink from './components/SkipLink'
import MobileActionBar from './components/MobileActionBar'

export default function App() {
  useDocumentLanguage()

  return (
    <Box sx={{ position: 'relative' }}>
      <SkipLink />
      <Nav />
      <Box component="main" id="main">
        <Hero />
        <About />
        <Work />
        <Projects />
        <TechStack />
        <Contact />
      </Box>
      <Footer />
      <MobileActionBar />
    </Box>
  )
}
