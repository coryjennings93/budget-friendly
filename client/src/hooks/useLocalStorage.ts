import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {

      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
     
      if (typeof initialValue === "function") {
        return initialValue();
      } else { 
        return initialValue;
      }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue])

  return [storedValue, setStoredValue];
}