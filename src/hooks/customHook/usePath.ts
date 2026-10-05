import { useEffect, useState } from "react";
import { PATH_VALUES } from "../../types/enum";

const usePath = (location: { pathname: string }) => {
  const [path, setPath] = useState("/");
  useEffect(() => {
    if (location.pathname === PATH_VALUES.ONLINE) {
      setPath(PATH_VALUES.ONLINE);
    } else if (location.pathname === PATH_VALUES.BLENDED) {
      setPath(PATH_VALUES.BLENDED);
    }
  }, [location.pathname]);

  return path;
};

export default usePath;
