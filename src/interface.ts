export type CustomEnum = string[];
export type CustomPayload =
  | any
  | CustomPayload[]
  | CustomEnum
  | string
  | number
  | { max: number; min: number; digit: number };
