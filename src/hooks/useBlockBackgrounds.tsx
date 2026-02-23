import { useSiteContent } from "@/hooks/useSiteContent";

export function useBlockBackgrounds() {
  const { data } = useSiteContent<Record<string, string>>("block_backgrounds");
  return data ?? {};
}
