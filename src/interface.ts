enum PayloadType {
  "tuple" = "tuple",
  "object" = "object",
  "string" = "string",
  "num" = "num",
  "enum" = "enum",
  "range" = "range",
  "date" = "date",
}
export type CustomEnum = string[]
export type CustomPayload =
  | any
  | CustomPayload[]
  | CustomEnum
  | string
  | number
  | { max: number; min: number; digit: number }
