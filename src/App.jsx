import { Header, Footer, ThemeProvider } from "./components/layout"
import { HeroSection, AboutSection, ServicesSection, ContactMapSection } from "./components/sections"
import { OrderSection } from "./components/forms"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <OrderSection />
          <ContactMapSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
