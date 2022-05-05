import mqtt from 'mqtt';

export default class Connection {
  client: mqtt.Client;

  allowLog = false;

  constructor(setting: {
    url: string;
    clientId: string;
    username: string;
    password: string;
    allowLog?: boolean;
  }) {
    const { url, clientId, username, password, allowLog } = setting;
    this.client = mqtt.connect(url, {
      clientId,
      username,
      password,
    });
    this.allowLog = allowLog || false;

    if (this.allowLog) {
      this.client.on('connect', () => {
        console.log(`<<<<< Simulator ${clientId} connect to ${url} >>>>>>`);
      });

      this.client.on('disconnect', (packet) => {
        console.log(
          `<<<<< Simulator ${clientId} disconnect to ${url} >>>>>>`,
          packet
        );
      });

      this.client.on('offline', () => {
        console.log(`<<<<< Simulator ${clientId} offline >>>>>`);
      });

      this.client.on('close', () => {
        throw new Error(
          `<<<<< Simulator ${clientId} connection with ${url} closed >>>>>`
        );
      });
    }

    this.client.on('error', (error) => {
      console.error(`<<<<< Simulator ${clientId} has error >>>>>`);
      throw error;
    });
  }

  public toggleAllowLog() {
    this.allowLog = !this.allowLog;
  }

  public getConnection() {
    return this.client;
  }

  public publish(topic: string, payload: any) {
    this.client.publish(topic, JSON.stringify(payload));
  }
}
