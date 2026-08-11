import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import NavBar from './components/navbar.tsx'
import Hero from './components/hero.tsx'
import Features, { features } from './components/features.tsx'
import About, { aboutTemplates } from './components/about.tsx'
import Footer from './components/footer.tsx'

const appContainer = document.getElementById('root') as HTMLDivElement

createRoot(appContainer).render(
  <StrictMode>
    <NavBar />
    <Hero />

    <Features features={features}/>

    <About aboutTemplates={aboutTemplates} />

    <Footer />

  </StrictMode>,
)
