import { useEffect, useState } from 'react'

let scriptPromise: Promise<void> | null = null

function loadKakaoScript(): Promise<void> {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Already loaded
    if (window.kakao && window.kakao.maps) {
      resolve()
      return
    }

    const appKey = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined
    if (!appKey) {
      reject(new Error('VITE_KAKAO_JS_KEY is not set'))
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve()
      })
    }
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Kakao Maps SDK failed to load'))
    }

    document.head.appendChild(script)
  })

  return scriptPromise
}

export function useKakaoLoader(): boolean {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadKakaoScript()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error('[KakaoLoader]', err))
  }, [])

  return isLoaded
}

// Augment the global Window interface for TypeScript
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void
        Map: new (
          container: HTMLElement,
          options: { center: InstanceType<KakaoLatLng>; level: number },
        ) => KakaoMapInstance
        LatLng: KakaoLatLng
        Marker: new (options: { position: InstanceType<KakaoLatLng> }) => KakaoMarkerInstance
        CustomOverlay: new (options: {
          position: InstanceType<KakaoLatLng>
          content: string | HTMLElement
          yAnchor?: number
          xAnchor?: number
        }) => KakaoOverlayInstance
      }
    }
  }
}

type KakaoLatLng = new (lat: number, lng: number) => { getLat: () => number; getLng: () => number }
type KakaoMapInstance = {
  setCenter: (latlng: InstanceType<KakaoLatLng>) => void
}
type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void
}
type KakaoOverlayInstance = {
  setMap: (map: KakaoMapInstance | null) => void
}
