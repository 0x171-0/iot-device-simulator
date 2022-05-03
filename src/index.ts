import Device from "./components/Device"
import DeviceType from "./components/DeviceType"
import { CustomPayload } from "./interface"

export function generateDataFromFormat(format: CustomPayload): any {
  if (
    Array.isArray(format) &&
    format.filter((e) => typeof e !== "string").length === 0
  ) {
    const randomIndex = Math.floor(Math.random() * format.length)
    return format[randomIndex]
  } else if (Array.isArray(format)) {
    return format.map((e) => generateDataFromFormat(e))
  } else if (
    typeof format === "object" &&
    format.hasOwnProperty("max") &&
    format.hasOwnProperty("min") &&
    format.hasOwnProperty("digit")
  ) {
    const { max, min, digit: decimals } = format
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
  } else if (typeof format === "object") {
    const result = {} as { [key: string]: CustomPayload }
    for (const [key, value] of Object.entries(format)) {
      result[key] = generateDataFromFormat(value)
    }
    return result
  }
  return format
}

export function createDeviceType(name: string) {
  return new DeviceType(name)
}
export function createDevice(setting: { type: DeviceType; state: string }) {
  const { type, state } = setting
  return new Device({ type, state })
}
