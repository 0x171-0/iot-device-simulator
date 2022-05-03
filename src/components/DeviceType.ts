import { CustomPayload } from "../interface"
import State from "./State"

export default class DeviceType {
  name: string
  states: State[]
  constructor(name: string) {
    this.states = []
    this.name = name
  }

  getStates() {
    return this.states
  }

  getState(name: string): State {
    const state = this.states.find((s) => s.name === name)
    if (!state) throw new Error("State Not found")
    return state
  }

  getRandomState(): State {
    const randomIndex = Math.floor(Math.random() * this.states.length)
    return this.states[randomIndex]
  }
  public addState(setting: {
    name: string
    payload: CustomPayload
    description?: string
  }) {
    this.states.push(new State(setting))
  }
}
