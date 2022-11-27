import { useState, useEffect } from "react";
import { DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from "./component";

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

export const useIsMobile = () => useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`);
export const useIsTablet = () => {
  const isBiggerThanMobile = useIsMobile();
  const isSmallerThanDesktop = useMediaQuery(`(max-width: ${TABLET_WIDTH}px)`);
  return !isBiggerThanMobile && isSmallerThanDesktop;
};

export const useIsDesktop = () =>
  useMediaQuery(`(min-width: ${DESKTOP_WIDTH}px)`);
