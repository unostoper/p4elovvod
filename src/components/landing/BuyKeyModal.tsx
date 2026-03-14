import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BuyKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productLabel?: string;
}

const BuyKeyModal = ({ open, onOpenChange, productLabel }: BuyKeyModalProps) => {
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Введите имя");
      return;
    }
    if (!telegram.trim()) {
      toast.error("Введите аккаунт в Telegram");
      return;
    }
    setSubmitting(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/send-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          firstName: name.trim(),
          telegram: telegram.trim(),
          productTitle: productLabel || "VPN-ключ",
          type: "key",
        }),
      });

      if (!res.ok) throw new Error("Send failed");

      toast.success("Заявка отправлена! Мы свяжемся с вами в Telegram.");
      onOpenChange(false);
      setName("");
      setTelegram("");
    } catch {
      toast.error("Ошибка при отправке заявки");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            Купить ключ
          </DialogTitle>
        </DialogHeader>

        {productLabel && (
          <div className="mb-2">
            <p className="font-display font-bold text-gold">{productLabel}</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          Оставьте контакты — мы напишем вам в Telegram для оформления.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-border"
            required
          />
          <Input
            placeholder="@username в Telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value.replace(/\s/g, ""))}
            className="bg-background border-border"
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide disabled:opacity-50"
          >
            {submitting ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BuyKeyModal;
