import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobile = () => useMediaQuery("(max-width: 600px)");
export const useIsTablet = () => {
  const isBiggerThanMobile = useIsMobile();
  const isSmallerThanDesktop = useMediaQuery("(max-width: 1024px)");
  return !isBiggerThanMobile && isSmallerThanDesktop;
};

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
