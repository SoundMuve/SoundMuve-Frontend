export type adsInterface = {
  id?: string;
  brandName: string;
  display: boolean;
  url: string;
  type: "banner" | "inline";
  image: string;
  createdAt?: number;
};

export type sponsorsInterface = {
  id?: string;
  brandName: string;
  logo: string;
  url: string;

  createdAt?: number;
};

export type interviewsInterface = {
  anchor: string;
  guest: string;
  image: string;
  title: string;
  description: string;
  recordedAudio: string;
  videoLink?: string;
  date: string;
  time: string;

  // isPlaying?: boolean;
  index?: number;

  createdAt?: number;
};

export type reachUsInterface = {
  name: string;
  email: string;
  message: string;

  createdAt: string;
  updatedAt: string;
};

export enum conditionType {
  "!=" = "!=",
  "<" = "<",
  "<=" = "<=",
  "==" = "==",
  ">" = ">",
  ">=" = ">=",
  "array-contains" = "array-contains",
  "array-contains-any" = "array-contains-any",
  "in" = "in",
  "not-in" = "not-in",
}

export interface whereCondition {
  property: string;
  condition:
    | "!="
    | "<"
    | "<="
    | "=="
    | ">"
    | ">="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in";
  value: string | number | boolean;
}
