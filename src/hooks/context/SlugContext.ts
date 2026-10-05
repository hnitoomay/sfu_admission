/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface SlugData {
  isMBA: boolean;
  isMSC: boolean;
  slug: string | undefined;
  data: any;
  homeCardData: any;
}

export const SlugContext = createContext<SlugData>({
  isMBA: false,
  isMSC: false,
  slug: "",
  data: null,
  homeCardData: null,
});
