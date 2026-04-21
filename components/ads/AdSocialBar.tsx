'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147324.profitablecpmratenetwork.com/a0/f4/75/a0f47591961ffff684e170319a72fe3f.js", "https://pl29147327.profitablecpmratenetwork.com/19/3a/73/193a735587f838a0807f60953565a499.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
