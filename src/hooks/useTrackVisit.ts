import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useTrackVisit() {
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);

  useEffect(() => {
    const track = async () => {
      try {
        const { data } = await supabase.functions.invoke("track-visit", {
          method: "POST",
          body: {
            path: window.location.pathname,
            referrer: document.referrer || null,
          },
        });
        if (data?.unique_visitors) {
          setUniqueVisitors(data.unique_visitors);
        }
      } catch {
        // silently fail
      }
    };

    track();
  }, []);

  return { uniqueVisitors };
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await globalThis.fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`,
          {
            method: "GET",
            headers: {
              "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );
        const data = await response.json();
        if (data?.unique_visitors) {
          setCount(data.unique_visitors);
        }
      } catch {
        // silently fail
      }
    };

    fetch();
  }, []);

  return count;
}
