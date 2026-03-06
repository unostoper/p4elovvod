import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
}

const OrderModal = ({ open, onOpenChange, productTitle, productPrice }: OrderModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    let formatted = "+7";
    if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
    if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
    if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length === 0) {
      setPhone("");
      return;
    }
    const withPrefix = raw.startsWith("7") ? raw : "7" + raw;
    setPhone(formatPhone(withPrefix.slice(0, 11)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    if (!agreed) {
      toast.error("Необходимо согласиться с условиями и офертой");
      return;
    }
    setSubmitting(true);

    // Send order to Telegram or just show success for now
    const phoneDigits = phone.replace(/\D/g, "");
    const message = `🛒 Новый заказ!\n\nТовар: ${productTitle}\nЦена: ${productPrice}\n\nИмя: ${firstName}\nФамилия: ${lastName}\nТел: +${phoneDigits}\nEmail: ${email}`;

    try {
      // For now, just simulate success
      await new Promise((r) => setTimeout(r, 800));
      console.log("Order:", message);
      toast.success("Заказ оформлен! Мы свяжемся с вами в ближайшее время.");
      onOpenChange(false);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAgreed(false);
    } catch {
      toast.error("Ошибка при оформлении заказа");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        <div className="bg-muted/50 rounded-lg p-4 mb-2 text-sm text-muted-foreground">
          Доставка пока что возможна только по России. Оплата пока тоже только российскими картами. Если хотите заказать в другую страну —{" "}
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            пишите в телеграм
          </a>
          , что-нибудь придумаем.
        </div>

        <div className="mb-4">
          <p className="font-display font-bold text-foreground">{productTitle}</p>
          <p className="font-display text-2xl font-bold text-gold">{productPrice}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-background border-border"
            required
          />
          <Input
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-background border-border"
          />
          <Input
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={handlePhoneChange}
            type="tel"
            className="bg-background border-border"
            required
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-background border-border"
            required
          />

          <div className="flex items-start gap-2 py-2">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c === true)}
              className="mt-0.5"
            />
            <label htmlFor="agree" className="text-sm text-muted-foreground leading-tight cursor-pointer">
              Я согласен с{" "}
              <Link to="/confidentiality" target="_blank" className="text-gold hover:underline">
                условиями
              </Link>{" "}
              и{" "}
              <Link to="/oferta" target="_blank" className="text-gold hover:underline">
                офертой
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide disabled:opacity-50"
          >
            {submitting ? "ОФОРМЛЯЕМ..." : "ДАЛЕЕ"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
