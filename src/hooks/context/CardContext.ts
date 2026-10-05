import { createContext } from "react";

interface cardType {
  type: string;
}

export const CardContext = createContext<cardType>({
  type: "",
});
