import { MapPin, Phone, Mail, Clock, Gem } from "lucide-react"

export function ContactMapSection() {
  return (
    <section id="contacts" className="py-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
        <div className="relative bg-slate-100 order-2 lg:order-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sru!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "500px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта офиса Алмаз Бур"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-800">Алмаз Бур</span>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Aloqa</h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-200">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Ofis manzili</h3>
                  <p className="text-slate-100 leading-relaxed text-sm sm:text-base">
                    Toshkent sh., Yunusobod tumani,
                    <br />
                    Chinobod ko'chasi, 10A uy
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Telefonlar</h3>
                  <div className="space-y-1">
                    <p className="text-slate-100 text-sm sm:text-base">+998 71 123 45 67</p>
                    <p className="text-slate-100 text-sm sm:text-base">+998 90 123 45 67</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-400">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Email</h3>
                  <p className="text-slate-100 text-sm sm:text-base">info@almazbur.uz</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in-up delay-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-white">Ish rejimi</h3>
                  <div className="space-y-1 text-white text-sm sm:text-base">
                    <p>Du-Ju: 9:00 - 18:00</p>
                    <p>Sh: 9:00 - 15:00</p>
                    <p>Ya: dam olish kuni</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-white/20 animate-fade-in-up delay-600">
              <div className="flex items-center gap-3 mb-3">
                <Gem className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                <h4 className="font-semibold text-white text-sm sm:text-base">Tezkor chaqiruv</h4>
              </div>
              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed">
                Shoshilinch buyurtmalar uchun +998 90 123 45 67 raqamiga qo'ng'iroq qiling. Biz shoshilinch ishlar uchun
                24 soat ishlaymiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
