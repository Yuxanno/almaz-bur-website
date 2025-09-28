import { Button } from "../ui/Button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Левая половина - текстовая информация */}
          <div className="text-left flex flex-col justify-center">
            <div className="flex items-center px-4 py-2 rounded-full glass-effect text-sm font-medium text-primary mb-6 animate-fade-in border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              2010 yildan beri professional xizmatlar
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-balance leading-tight animate-fade-in-up delay-200">
              <span className="text-primary font-bold">Almaz Bur</span> -
              Professional Olmosli burg'ulash va beton kesish xizmatlari
            </h1>

            <p className="text-lg sm:text-xl md:text-xl text-muted-foreground mb-8 sm:mb-12 text-pretty leading-relaxed animate-fade-in-up delay-300">
              G'ijduvonda eng murakkab qurilish vazifalarini hal qilish uchun
              zamonaviy texnologiyalar va 15+ yillik professional tajriba. Almaz
              bur, beton teshish, g'isht teshish, suv tashish teshiklari, elektr
              tashish teshiklari, kanalizatsiya teshiklari.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start animate-fade-in-up delay-500">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl modern-shadow hover-lift group font-semibold transition-all duration-300"
              >
                Maslahat olish
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl border-2 border-primary/50 hover:bg-primary/20 backdrop-blur-sm group bg-primary/10 text-foreground font-semibold transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ishlarni ko'rish
              </Button>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center animate-fade-in-up delay-700">
              <div className="space-y-2 glass-effect p-3 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Bajarilgan loyihalar
                </div>
              </div>
              <div className="space-y-2 glass-effect p-3 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  15+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Yillik tajriba
                </div>
              </div>
              <div className="space-y-2 glass-effect p-3 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Qo'llab-quvvatlash
                </div>
              </div>
              <div className="space-y-2 glass-effect p-3 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Sifat kafolati
                </div>
              </div>
            </div>
          </div>

          {/* Правая половина - видео без звука (только для ПК) */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl modern-shadow animate-fade-in-up delay-400 h-full flex items-center justify-center hidden lg:block">
            <div className="w-full h-full aspect-video max-h-[70vh] relative">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover rounded-2xl"
                poster="/logo.jpg"
              >
                <source src="/7228386197-235311668-1.mp4" type="video/mp4" />
                Sizning brauzeringiz ushbu videoni qo'llab-quvvatlamaydi.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
