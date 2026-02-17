import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteContent<T = any>(blockId: string) {
  return useQuery({
    queryKey: ["site_content", blockId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", blockId)
        .maybeSingle();
      if (error) throw error;
      return (data?.content ?? null) as T | null;
    },
    staleTime: 60_000,
  });
}

export function useAllSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*");
      if (error) throw error;
      return data as { id: string; content: any; updated_at: string }[];
    },
  });
}

export function useUpdateSiteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: any }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
}
