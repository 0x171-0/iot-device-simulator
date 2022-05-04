import { CustomPayload } from '../interface';

export default class State {
  name: string;

  format: CustomPayload;

  constructor(settings: { name: string; payload: CustomPayload }) {
    const { name, payload } = settings;
    this.name = name;
    this.format = payload;
  }

  public getFormat() {
    return this.format;
  }
}
