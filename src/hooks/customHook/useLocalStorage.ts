import { useState } from 'react';
import { IUser } from '../context/AuthContext';

export const useLocalStorage = (
  keyName: string,
  defaultValue: IUser | null
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as IUser;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: IUser | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      //
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};
