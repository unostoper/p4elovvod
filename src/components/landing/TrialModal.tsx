import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TrialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TrialModal = ({ open, onOpenChange }: TrialModalProps) => {
  const [loading, setLoading] = useState(false);
  const [trialKey, setTrialKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const fetchKey = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-trial-key");
      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.message || "Ключи закончились");
        return;
      }
      setTrialKey(data.key);
    } catch {
      setError("Не удалось получить ключ. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && !trialKey && !loading) {
      fetchKey();
    }
    if (!isOpen) {
      setTrialKey(null);
      setError(null);
      setCopied(false);
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
          <DialogTitle className="font-display text-2xl">Ваш пробный ключ</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Один ключ выдаётся на один IP-адрес.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
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
                Попробовать снова
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
                Скопируйте ключ и используйте его для подключения.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrialModal;
