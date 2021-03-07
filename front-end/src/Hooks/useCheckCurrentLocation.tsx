import { useRef, useEffect, RefObject, useState } from "react";
import { useLocation } from "react-router-dom";

export const useCheckCurrentLocation = (checkUri: string) => {
  
  const location: any = useLocation();

  const [isCurrentPage, setIsCurrentPage] = useState(false);

  useEffect(() => {
    const urlChecker = new RegExp(`^${checkUri}`);
    setIsCurrentPage(urlChecker.test(location.pathname))
  }, [location]);

  return isCurrentPage;
};
