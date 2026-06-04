/* Minimal ambient declaration for the Kakao Maps JS SDK loaded at runtime via
   a <script> tag (autoload=false). The SDK has no official @types package that
   matches this loading style, so we type the global loosely as `any` and keep
   usage confined to KakaoMap.tsx / useKakaoLoader.ts. */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export {};
