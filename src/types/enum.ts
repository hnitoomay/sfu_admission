export enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

export enum NATION {
  N = "N",
  C = "C",
  E = "E",
  P = "P",
}

export enum WEEK {
  "weekdays" = 0,
  "weekends" = 1,
  "both" = 2,
}

export enum APPLYPROGRAMSTATUS {
  "reviewing" = 0,
  "accepted" = 1,
  "rejected" = 2,
}

export const GENDERARR = [
  { value: GENDER.MALE, label: "Male" },
  { value: GENDER.FEMALE, label: "Female" },
];

export const NRCNATIONARR = [
  { value: NATION.N, label: NATION.N },
  { value: NATION.C, label: NATION.C },
  { value: NATION.E, label: NATION.E },
  { value: NATION.P, label: NATION.P },
];

export const PROGRAMARR = [
  { value: "MBA", label: "MBA" },
  { value: "MSc", label: "MSc" },
];

export const PATH_VALUES = {
  ONLINE: "/sfu-mba-online",
  BLENDED: "/sfu-mba-blended",
  HOME: "/",
};
