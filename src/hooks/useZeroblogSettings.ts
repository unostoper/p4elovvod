import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ZeroblogSettings = {
  id: number;
  site_title: string;
  site_description: string;
  accent_color: string;
  author_name: string;
  tg_channel: string | null;
};

export const useZeroblogSettings = () =>
  useQuery({
    queryKey: ["zeroblog_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data as ZeroblogSettings | null;
    },
    staleTime: 60_000,
  });
