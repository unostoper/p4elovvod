import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";

export type BlockVisibility = Record<string, boolean>;

const DEFAULT_VISIBILITY: BlockVisibility = {
  hero: true,
  offers: true,
  pricing: true,
  advantages: true,
  how_it_works: true,
  reviews: true,
  news: true,
  cta: true,
  seo: true,
  faq: true,
  // Pages
  page_shop: true,
  page_blog: true,
  page_news: true,
};

export function useBlockVisibility() {
  const { data, isLoading } = useSiteContent<BlockVisibility>("block_visibility");
  const visibility: BlockVisibility = { ...DEFAULT_VISIBILITY, ...data };
  return { visibility, isLoading };
}

export function useBlockVisibilityAdmin() {
  const { data, isLoading } = useSiteContent<BlockVisibility>("block_visibility");
  const updateMutation = useUpdateSiteContent();

  const visibility: BlockVisibility = { ...DEFAULT_VISIBILITY, ...data };

  const toggle = (blockId: string) => {
    const updated = { ...visibility, [blockId]: !visibility[blockId] };
    updateMutation.mutate({ id: "block_visibility", content: updated });
  };

  return { visibility, toggle, isLoading, saving: updateMutation.isPending };
}
