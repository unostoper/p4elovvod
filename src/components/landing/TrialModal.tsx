import { useState, useEffect } from "react";
import { Copy, Check, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";

interface TrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TrialModalContent {
  title: string;
  description: string;
  copy_hint: string;
  error_no_keys: string;
  error_generic: string;
  retry_button: string;
}

const TrialModal = ({ open, onOpenChange }: TrialModalProps) => {
  const [loading, setLoading] = useState(false);
  const [trialKey, setTrialKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { toast } = useToast();
  const { data: texts } = useSiteContent<TrialModalContent>("trial_modal");

  const t = {
    title: texts?.title ?? "Ваш пробный ключ",
    description: texts?.description ?? "Один ключ выдаётся на один IP-адрес.",
    copy_hint: texts?.copy_hint ?? "Скопируйте ключ и используйте его для подключения.",
    error_no_keys: texts?.error_no_keys ?? "Свободные ключи закончились",
    error_generic: texts?.error_generic ?? "Не удалось получить ключ. Попробуйте позже.",
    retry_button: texts?.retry_button ?? "Попробовать снова",
  };

  const fetchKey = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/get-trial-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${anonKey}`,
        },
      });
      const data = await res.json();

      if (!res.ok || data?.error) {
        setError(data?.error === "no_keys" ? t.error_no_keys : (data?.message || t.error_generic));
        return;
      }
      if (!data?.key) {
        setError(t.error_generic);
        return;
      }
      setTrialKey(data.key);
    } catch (e) {
      console.error("Trial key fetch error:", e);
      setError(t.error_generic);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@")) {
      toast({ title: "Введите корректный email", variant: "destructive" });
      return;
    }
    setEmailSubmitted(true);
    fetchKey();
  };


  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setTrialKey(null);
      setError(null);
      setCopied(false);
      setEmail("");
      setEmailSubmitted(false);
    }
    onOpenChange(isOpen);
  };

  const handleCopy = async () => {
    if (!trialKey) return;
    await navigator.clipboard.writeText(trialKey);
    setCopied(true);
    toast({ title: "Скопировано!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="bg-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!emailSubmitted && !trialKey && !loading && (
            <div className="space-y-4">
              <div>
                <label htmlFor="trial-email" className="text-sm text-muted-foreground mb-1 block">
                  Email
                </label>
                <input
                  id="trial-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-opacity btn-shine"
              >
                Получить ключ
              </button>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gold" />
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchKey}
                className="px-6 py-2 border border-border rounded-lg text-sm hover:border-gold transition-colors"
              >
                {t.retry_button}
              </button>
            </div>
          )}

          {trialKey && !loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-4">
                <code className="flex-1 text-foreground font-mono text-sm break-all select-all">
                  {trialKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Копировать"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t.copy_hint}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrialModal;
