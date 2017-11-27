import {IncomingWebhook, requestOptionsTransport} from '@slack/client';

export default class Slack {
  constructor(webhook, options) {
    this.incomingWebhook = new IncomingWebhook(webhook, {
      _transport: requestOptionsTransport(options)
    });
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
