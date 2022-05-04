import { CustomPayload } from '../interface';
import State from './State';

export default class DeviceType {
  name: string;

  states: State[];

  constructor(name: string) {
    this.states = [];
    this.name = name;
  }

  private getStates() {
    return this.states;
  }

  public getState(name: string): State {
    const state = this.states.find((s) => s.name === name);
    if (!state) throw new Error('State Not found');
    return state;
  }

  public getRandomState(): State {
    const randomIndex = Math.floor(Math.random() * this.states.length);
    return this.states[randomIndex];
  }

  public addState(setting: {
    name: string;
    payload: CustomPayload;
    description?: string;
  }): void {
    this.states.push(new State(setting));
  }
}
