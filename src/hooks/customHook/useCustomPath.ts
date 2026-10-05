import { useEffect, useState } from "react";

const useCustomPath = (pathname: string, target: string) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (pathname === target) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [pathname, target]);

  return isMatch;
};

export default useCustomPath;
