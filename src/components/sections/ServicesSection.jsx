import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { ArrowRight } from "lucide-react"
import { services } from "@/constants/services"

export function ServicesSection() {

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background diamond-sparkle"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-primary text-sm font-medium mb-6 border border-primary/20 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full mr-2" />
            Professional xizmatlar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance px-2 animate-fade-in-up delay-200">
            Bizning <span className="text-primary font-bold">xizmatlarimiz</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4 animate-fade-in-up delay-300">
            Zamonaviy uskunalar va ilg'or texnologiyalardan foydalangan holda olmosli burg'ulash va beton kesish
            bo'yicha to'liq xizmatlar spektrini taqdim etamiz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className={`group overflow-hidden hover-lift border-0 modern-shadow glass-effect animate-fade-in-up`} style={{ animationDelay: `${400 + index * 100}ms` }}>
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <CardHeader className="pb-4 p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-4 sm:p-6">
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group/btn hover:bg-primary/10 rounded-xl p-3 sm:p-4 h-auto border border-primary/20"
                  >
                    <span className="font-medium text-sm sm:text-base">Batafsil ma'lumot</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
