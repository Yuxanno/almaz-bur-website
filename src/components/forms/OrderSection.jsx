import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Label } from "../ui/Label";
import { Modal } from "../ui/Modal";
import {
  Clock,
  Gem,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { apiCall } from "@/utils/api";

export function OrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Функция форматирования номера телефона
  const formatPhoneNumber = (value) => {
    // Удаляем все символы кроме цифр
    const numbers = value.replace(/\D/g, "");

    // Если номер начинается с 998, убираем его
    let cleanNumber = numbers;
    if (numbers.startsWith("998")) {
      cleanNumber = numbers.substring(3);
    }

    // Ограничиваем до 9 цифр
    cleanNumber = cleanNumber.substring(0, 9);

    // Форматируем как +998 (XX) XXX XX XX
    if (cleanNumber.length === 0) {
      return "+998 (";
    } else if (cleanNumber.length <= 2) {
      return `+998 (${cleanNumber}`;
    } else if (cleanNumber.length <= 5) {
      return `+998 (${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(
        2
      )}`;
    } else if (cleanNumber.length <= 7) {
      return `+998 (${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(
        2,
        5
      )} ${cleanNumber.substring(5)}`;
    } else {
      return `+998 (${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(
        2,
        5
      )} ${cleanNumber.substring(5, 7)} ${cleanNumber.substring(7)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await apiCall("/api/orders", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setModalType("success");
        setModalTitle("Buyurtma qabul qilindi! 🎉");
        setModalMessage(
          "Sizning buyurtmangiz muvaffaqiyatli yuborildi. Bizning menejer 15 daqiqa ichida siz bilan bog'lanadi va barcha tafsilotlarni muhokama qiladi."
        );
        setModalOpen(true);
        setFormData({
          name: "",
          phone: "",
          address: "",
          service: "",
          description: "",
        });
      } else {
        setModalType("error");
        setModalTitle("Xatolik yuz berdi 😔");
        setModalMessage(
          "Buyurtma yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki telefon orqali to'g'ridan-to'g'ri bog'laning."
        );
        setModalOpen(true);
        console.error("Error submitting form:", result.message);
      }
    } catch (error) {
      setModalType("error");
      setModalTitle("Internet aloqasi yo'q 😞");
      setModalMessage(
        "Internet aloqasida muammo bor. Iltimos, internet aloqangizni tekshiring va qaytadan urinib ko'ring."
      );
      setModalOpen(true);
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="order"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background diamond-sparkle relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-lg animate-bounce" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-primary text-sm font-medium mb-6 border border-primary/20 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Professional xizmatlar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance px-2 animate-fade-in-up">
            <span className="text-primary font-bold">Buyurtma</span> yuborish
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4 animate-fade-in-up delay-200">
            Formani to'ldiring, biz tafsilotlarni aniqlash uchun siz bilan
            bog'lanamiz
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="group overflow-hidden hover-lift border-0 modern-shadow glass-effect animate-fade-in-up delay-300">
            <CardHeader className="text-center pb-8 p-6 sm:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Gem className="w-8 h-8 text-white" />
                  </div>
                  <Sparkles className="w-6 h-6 text-accent absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                Buyurtma yuborish
              </CardTitle>
              <p className="text-muted-foreground text-base sm:text-lg">
                Formani to'ldiring, biz tafsilotlarni aniqlash uchun siz bilan
                bog'lanamiz
              </p>
            </CardHeader>
            <CardContent className="pt-0 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 animate-fade-in-up delay-400">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Ism *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ismingizni kiriting"
                      className="h-12 border-2 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2 animate-fade-in-up delay-500">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Telefon raqami *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+998 (XX) XXX XX XX"
                      className="h-12 border-2 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in-up delay-600">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-foreground"
                  >
                    Obyekt manzili
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Obyekt manzilini ko'rsating"
                    className="h-12 border-2 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                  />
                </div>

                <div className="space-y-2 animate-fade-in-up delay-700">
                  <Label
                    htmlFor="service"
                    className="text-sm font-medium text-foreground"
                  >
                    Xizmat turi *
                  </Label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-12 border-2 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl px-3 py-2 bg-background transition-all duration-200"
                  >
                    <option value="">Xizmatni tanlang</option>
                    <option value="Burg'ulash">Burg'ulash</option>
                    <option value="Beton kesish">Beton kesish</option>
                    <option value="Demontaj">Demontaj</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>

                <div className="space-y-2 animate-fade-in-up delay-800">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-foreground"
                  >
                    Buyurtma tafsilotlari
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Qanday ishlarni bajarish kerakligini yozing..."
                    className="border-2 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg font-semibold rounded-xl modern-shadow hover-lift group transition-all duration-300 animate-fade-in-up delay-900"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Gem className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Buyurtma yuborish
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {!submitStatus && (
                  <div className="flex items-center justify-center gap-3 text-muted-foreground bg-muted/50 border border-primary/20 rounded-xl p-4 animate-fade-in-up delay-1000">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      Menejer 15 daqiqa ichida siz bilan bog'lanadi
                    </span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
      />
    </section>
  );
}
