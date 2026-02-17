import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { username, password },
      });

      if (error || !data?.success) {
        toast.error(data?.error || "Неверный логин или пароль");
        return;
      }

      sessionStorage.setItem("admin_token", data.token);
      navigate("/captain-hook-panel");
    } catch {
      toast.error("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-display text-xl font-bold">Вход в панель</h1>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading || !username || !password}>
          {loading ? "Вхожу…" : "Войти"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
