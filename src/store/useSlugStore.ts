/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface SlugState {
  isMBA: boolean;
  isMSC: boolean;
  slug: string | null;
  data: any;
  homeCardData: any;
  setSlugInfo: (
    slug: string,
    isMBA: boolean,
    isMSC: boolean,
    data: any,
    homeCardData: any
  ) => void;
}

export const useSlugStore = create<SlugState>((set) => ({
  isMBA: false,
  isMSC: false,
  slug: null,
  data: null,
  homeCardData: null,
  setSlugInfo: (slug, isMBA, isMSC, data, homeCardData) =>
    set({
      isMBA,
      isMSC,
      slug,
      data,
      homeCardData,
    }),
}));
