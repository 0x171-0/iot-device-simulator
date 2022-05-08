import { generateDataFromFormat } from '..';
import Connection from './Coonection';
import DeviceType, { Topic as SubTopicTrigger } from './DeviceType';
import State from './State';

export default class Device {
  private name: string;

  private interval: number; // seconds

  private type: DeviceType;

  private state: State;

  private topic: string;

  private isActive = true;

  private connection: Connection;

  private intervalJob: NodeJS.Timer;

  private allowLog = false;

  subTopics: SubTopicTrigger[] = [];

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
    this.connection.getConnection().on('message', (subTopic: string, msg) => {
      let payload;
      try {
        payload = JSON.parse(msg.toString());
      } catch (e) {
        payload = msg.toString();
      }

      if (this.allowLog) {
        console.log(`<<<<< Get subscripted topic: ${subTopic} >>>>>`, payload);
      }
      for (const t of this.subTopics) {
        if (t.topic === subTopic && t.trigger) {
          let value = payload;
          for (const k of t.trigger.key.split('.')) {
            value = value[k];
          }
          if (value === t.trigger.value) {
            if (this.allowLog) {
              console.log(
                `${subTopic} trigger stage change to ${t.trigger.state}`
              );
            }
            return this.setState(t.trigger.state);
          }
        }
      }
    });
    this.report();
  }

  public getState() {
    return this.state;
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

  public addSubTopic(setting: SubTopicTrigger): void {
    this.connection.getConnection().subscribe(setting.topic);
    this.subTopics.push(setting);
  }
}
