import { MapPin, Phone, Mail, Clock, Gem } from "lucide-react";

export function ContactMapSection() {
  return (
    <section id="contacts" className="py-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[500px]">
        <div className="relative bg-slate-100 order-2 lg:order-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d763.01518032617!2d64.6895566695966!3d40.09635909821831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5069b6dd2ed667%3A0x1fec618c85ede71d!2sALIBOBO%20QURILISH%20MOLLARI!5e0!3m2!1sru!2s!4v1759056647538!5m2!1sru!2s"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта офиса Алмаз Бур"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-800">Almaz Bur</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white p-6 sm:p-8 lg:p-12 xl:p-16 relative overflow-hidden order-1 lg:order-2">
          {/* Diamond pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-6 h-6 bg-white rotate-45 animate-pulse" />
            <div className="absolute top-32 right-16 w-4 h-4 bg-cyan-300 rotate-45 animate-pulse delay-300" />
            <div className="absolute bottom-24 left-20 w-3 h-3 bg-blue-300 rotate-45 animate-pulse delay-700" />
            <div className="absolute bottom-40 right-12 w-5 h-5 bg-white rotate-45 animate-pulse delay-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 animate-fade-in-up">
              <div className="relative">
                <Gem className="w-8 sm:w-10 h-8 sm:h-10 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Aloqa
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-200">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                    Ofis manzili
                  </h3>
                  <p className="text-slate-100 leading-relaxed text-sm sm:text-base">
                    Buxoro viloyati G'ijduvon tumani "Baxt uyi" ro'parasida.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                    Telefonlar
                  </h3>
                  <div className="space-y-1">
                    <p className="text-slate-100 text-sm sm:text-base">
                      +998 91 921 94 91
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">
                    Ish rejimi
                  </h3>
                  <div className="space-y-1 text-white text-sm sm:text-base">
                    <p>7:30 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-white/20 animate-fade-in-up delay-600">
              <div className="flex items-center gap-3 mb-3">
                <Gem className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                <h4 className="font-semibold text-white text-sm sm:text-base">
                  Biz sifatli ishlaymiz!
                </h4>
              </div>
              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed">
                Betonda almazli burg‘ilashni yuqori sifatda, tez va toza bajarib beramiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
