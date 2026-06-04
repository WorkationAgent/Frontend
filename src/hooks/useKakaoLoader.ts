/* Loads the Kakao Maps JS SDK exactly once for the whole app (build spec §6.1).
   Uses autoload=false + kakao.maps.load(cb) as the SDK requires. The module-level
   promise dedupes concurrent callers (e.g. three map cards mounting at once). */
import { useEffect, useState } from "react";

let loadPromise: Promise<void> | null = null;

function loadKakaoSdk(appkey: string): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    // Already present (e.g. HMR re-run)
    if (window.kakao?.maps) {
      resolve();
      return;
    }
    const existing = document.getElementById("kakao-maps-sdk") as HTMLScriptElement | null;
    const onReady = () => window.kakao.maps.load(() => resolve());

    if (existing) {
      existing.addEventListener("load", onReady);
      existing.addEventListener("error", () => reject(new Error("Kakao SDK load failed")));
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-maps-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false&libraries=services`;
    script.onload = onReady;
    script.onerror = () => reject(new Error("Kakao SDK load failed"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useKakaoLoader(): { loaded: boolean; error: boolean } {
  const appkey = import.meta.env.VITE_KAKAO_JS_KEY;
  const [loaded, setLoaded] = useState<boolean>(() => Boolean(window.kakao?.maps));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!appkey) {
      setError(true);
      return;
    }
    let alive = true;
    loadKakaoSdk(appkey)
      .then(() => alive && setLoaded(true))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [appkey]);

  return { loaded, error };
}
