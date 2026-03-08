import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

export function useTrackVisit() {
  const location = useLocation();
  const tracked = useRef(new Set<string>());

  useEffect(() => {
    const path = location.pathname;
    if (tracked.current.has(path)) return;
    tracked.current.add(path);

    supabase.functions.invoke("track-visit", {
      method: "POST",
      body: {
        path,
        referrer: document.referrer || null,
      },
    }).catch(() => {});
  }, [location.pathname]);
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
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

    fetchCount();
  }, []);

  return count;
}
