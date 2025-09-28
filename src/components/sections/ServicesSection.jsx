import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { services } from "@/constants/services";

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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance px-2 animate-fade-in-up delay-200">
            Bizning{" "}
            <span className="text-primary font-bold">xizmatlarimiz</span> -
            Almaz Bur
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4 animate-fade-in-up delay-300">
            Zamonaviy uskunalar va ilg'or texnologiyalardan foydalangan holda
            olmosli burg'ulash va beton kesish bo'yicha to'liq xizmatlar
            spektrini taqdim etamiz. Almaz bur, beton teshish, g'isht teshish,
            suv tashish teshiklari, elektr tashish teshiklari, kanalizatsiya
            teshiklari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`group overflow-hidden hover-lift border-0 modern-shadow glass-effect animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CardHeader className="pb-4 p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
