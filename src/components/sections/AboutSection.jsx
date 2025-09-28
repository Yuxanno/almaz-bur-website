import { Card, CardContent } from "../ui/Card";
import { Users } from "lucide-react";
import { advantages } from "@/constants/advantages";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-background relative overflow-hidden diamond-sparkle"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-primary text-sm font-medium mb-6 border border-primary/20 animate-fade-in">
            <Users className="w-4 h-4 mr-2" />
            Bizning kompaniya haqida
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-balance animate-fade-in-up delay-200">
            <span className="text-primary font-bold">Almaz Bur</span>{" "}
            kompaniyasi haqida
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed animate-fade-in-up delay-300">
            Almaz Bur - G'ijduvonda professional olmosli burg'ulash va beton
            kesish sohasida ixtisoslashgan kompaniya. Bizning jamoamiz 15+
            yillik tajribaga ega va har qanday murakkablikdagi ishlarni sifat
            kafolati bilan bajarish uchun zamonaviy uskunalardan foydalanadi.
            Almaz bur, beton teshish, g'isht teshish, suv tashish teshiklari,
            elektr tashish teshiklari, kanalizatsiya teshiklari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card
                key={index}
                className={`group text-center p-8 hover-lift border-0 modern-shadow bg-slate-800/50 backdrop-blur-sm animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CardContent className="pt-0">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-700/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 shadow-lg">
                      <span className="text-lg font-bold text-primary">
                        {advantage.metric}
                      </span>
                      <span className="text-xs text-slate-200 ml-1">
                        {advantage.unit}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
