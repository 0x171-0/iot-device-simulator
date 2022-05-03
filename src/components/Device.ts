import { generateDataFromFormat } from ".."
import DeviceType from "./DeviceType"
import State from "./State"

export default class Device {
  name: string
  interval: number //seconds
  type: DeviceType
  state: State

  constructor(settings: {
    type: DeviceType
    state: string
    name?: string
    interval?: number
  }) {
    const { type, state, name, interval } = settings
    this.type = type
    this.state = state ? this.type.getState(state) : this.type.getRandomState()
    this.name = name || type.name
    this.interval = interval || 20
  }

  public generateData(): any {
    return generateDataFromFormat(this.state.getFormat())
  }

  public setState(state: string) {
    this.state = this.type.getState(state)
  }
}
