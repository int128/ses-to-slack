import {IncomingWebhook, requestOptionsTransport} from '@slack/client';

export default class Slack {
  constructor(webhook, defaults, requestOptions) {
    this.incomingWebhook = new IncomingWebhook(
      webhook,
      Object.assign({},
        defaults,
        {_transport: requestOptionsTransport(requestOptions)}));
  }

  send(message) {
    return new Promise((resolve, reject) => {
      this.incomingWebhook.send(message, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
