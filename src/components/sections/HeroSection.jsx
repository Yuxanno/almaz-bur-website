import { Button } from "../ui/Button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 diamond-sparkle">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.2),transparent_50%)]" />
      </div>

      <div className="floating-diamonds">
        <div className="diamond" style={{ top: "20%" }}></div>
        <div className="diamond" style={{ top: "40%" }}></div>
        <div className="diamond" style={{ top: "60%" }}></div>
        <div className="diamond" style={{ top: "80%" }}></div>
        <div className="diamond" style={{ top: "30%" }}></div>
        <div className="diamond" style={{ top: "50%" }}></div>
        <div className="diamond" style={{ top: "70%" }}></div>
        <div className="diamond" style={{ top: "25%" }}></div>
        <div className="diamond" style={{ top: "75%" }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-bounce" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-sm font-medium text-primary mb-8 animate-fade-in border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            2010 yildan beri professional xizmatlar
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance leading-tight px-2 animate-fade-in-up delay-200">
            Olmosli burg'ulash va <span className="text-primary font-bold">beton kesish</span> har qanday murakkablikda
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 text-pretty max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in-up delay-300">
            Qurilishda eng murakkab vazifalarni hal qilish uchun zamonaviy texnologiyalar va professional yondashuv
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 animate-fade-in-up delay-500">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl modern-shadow hover-lift group font-semibold"
            >
              Maslahat olish
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl border-2 border-primary/50 hover:bg-primary/20 backdrop-blur-sm group bg-primary/10 text-foreground font-semibold"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ishlarni ko'rish
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center px-4 animate-fade-in-up delay-700">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Bajarilgan loyihalar</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">15+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Yillik tajriba</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Qo'llab-quvvatlash</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Sifat kafolati</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
