import { useEffect, useState } from "react";

export default function useResponsiveFix() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ✅ Fix mobile vh issue
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);

    // ✅ Ensure layout renders AFTER correct width is known
    setTimeout(() => {
      setReady(true);
    }, 50);

    return () => window.removeEventListener("resize", setVH);
  }, []);

  return ready;
}
