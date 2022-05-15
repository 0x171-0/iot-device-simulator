import Connection from './components/Coonection';
import Device from './components/Device';
import DeviceType from './components/DeviceType';
import { CustomPayload } from './interface';

export function generateDataFromFormat(format: CustomPayload): any {
  if (
    Array.isArray(format) &&
    format.filter((e) => typeof e === 'object').length === 0
  ) {
    const randomIndex = Math.floor(Math.random() * format.length);
    return format[randomIndex];
  }
  if (Array.isArray(format)) {
    return format.map((e) => generateDataFromFormat(e));
  }
  if (
    typeof format === 'object' &&
    Object.prototype.hasOwnProperty.call(format, 'max') &&
    Object.prototype.hasOwnProperty.call(format, 'min') &&
    Object.prototype.hasOwnProperty.call(format, 'digit')
  ) {
    const { max, min, digit: decimals } = format;
    const number = parseFloat(Math.random() * (max - min) + min);
    if (decimals >= 0) {
      return +number.toFixed(decimals);
    }
    return +number.toFixed(0) / 10 ** Math.abs(decimals);
  }
  if (typeof format === 'object') {
    const result = {} as { [key: string]: CustomPayload };
    for (const [key, value] of Object.entries(format)) {
      result[key] = generateDataFromFormat(value);
    }
    return result;
  }
  return format;
}
export function createConnectionToBroker(setting: {
  url: string;
  clientId: string;
  username: string;
  password: string;
  allowLog?: boolean;
}) {
  return new Connection(setting);
}

export function createDeviceType(name: string) {
  return new DeviceType(name);
}
export function createDevice(setting: {
  type: DeviceType;
  state: string;
  topic: string;
  connection: Connection;
  interval?: number;
  allowLog?: boolean;
}) {
  return new Device(setting);
}
