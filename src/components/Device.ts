import { generateDataFromFormat } from '..';
import Connection from './Coonection';
import DeviceType from './DeviceType';
import State from './State';

export default class Device {
  name: string;

  interval: number; // seconds

  type: DeviceType;

  state: State;

  topic: string;

  isActive = true;

  connection: Connection;

  intervalJob: NodeJS.Timer;

  allowLog = false;

  constructor(settings: {
    type: DeviceType;
    state: string;
    topic: string;
    name?: string;
    interval?: number;
    connection: Connection;
    allowLog?: boolean;
  }) {
    const { type, state, name, interval, topic, connection, allowLog } =
      settings;
    this.type = type;
    this.state = state ? this.type.getState(state) : this.type.getRandomState();
    this.name = name || type.name;
    this.interval = interval || 2000;
    this.topic = topic || '';
    this.connection = connection;
    this.allowLog = allowLog || false;
    this.report();
  }

  public setState(state: string) {
    this.state = this.type.getState(state);
  }

  public setInterval(interval: number) {
    this.interval = interval;
  }

  public setTopic(topic: string) {
    this.topic = topic;
  }

  public toggleIsActive() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.report();
    } else {
      clearInterval(this.intervalJob);
    }
  }

  public toggleAllowLog() {
    this.allowLog = !this.allowLog;
  }

  public generateData(): any {
    return generateDataFromFormat(this.state.getFormat());
  }

  private report() {
    this.intervalJob = setInterval(() => {
      const data = this.generateData();
      if (this.allowLog) {
        console.log(`Publish to :${this.topic}: >>>>>`, data);
      }
      this.connection.publish(this.topic, data);
    }, this.interval);
  }
}
