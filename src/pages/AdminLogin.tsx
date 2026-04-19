import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin, setAdminToken } from "@/lib/admin";
import { toast } from "sonner";

const AdminLogin = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  if (isAdmin()) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { username: u, password: p },
      });
      if (error || !data?.success) {
        toast.error(data?.error || "Неверный логин или пароль");
        return;
      }
      setAdminToken(data.token);
      nav("/admin");
    } catch {
      toast.error("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="bevel bg-black/85 p-6 w-full max-w-md space-y-4"
      >
        <h1 className="font-impact text-3xl text-rainbow text-center">
          🔐 ADMIN LOGIN
        </h1>
        <p className="font-pixel text-[10px] text-neon-yellow text-center blink">
          AUTHORIZED PERSONNEL ONLY
        </p>
        <input
          className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white outline-none"
          placeholder="username"
          value={u}
          onChange={(e) => setU(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white outline-none"
          placeholder="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={loading || !u || !p}
          className="bevel bg-neon-pink text-white font-impact text-xl uppercase w-full py-2 hover:bg-neon-yellow hover:text-black disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Enter ★"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
