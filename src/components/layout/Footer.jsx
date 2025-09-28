import { MessageCircle, Instagram, Send } from "lucide-react";
import { socialLinks, quickLinks } from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <img
              src="/logo.jpg"
              alt="Almaz Bur Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-primary mb-4"
            />
            <p className="text-secondary-foreground/80 mb-4">
              O'zbekistonda professional olmosli burg'ulash va beton kesish
              xizmatlari. Sifat, ishonchlilik, tajriba.
            </p>
            <p className="text-sm text-secondary-foreground/60">
              © 2024 Almaz Bur. Barcha huquqlar himoyalangan.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ijtimoiy tarmoqlar</h4>
            <div className="flex space-x-4">
              <a
                href="https://t.me/+998919219491"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Telegram"
                target="_blank"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/almazbur.gijduvon/reels/"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            Sayt "Almaz Bur" kompaniyasi xizmatlarini namoyish qilish uchun
            yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
}
