import { createContext } from "react";

interface ProgressData {
  currentId: number;
  id: number;
}

export const ProgressContext = createContext<ProgressData>({
  currentId: 0,
  id: 1,
});
