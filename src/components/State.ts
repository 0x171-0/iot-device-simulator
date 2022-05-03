import { CustomPayload } from "../interface"

export default class State {
  name: string
  format: CustomPayload
  description?: string
  constructor(settings: {
    name: string
    payload: CustomPayload
    description?: string
  }) {
    const { name, payload, description } = settings
    this.name = name
    this.format = payload
    this.description = description
  }
  public getFormat() {
    return this.format
  }
}
