import Slack from './slack';
import template from './template';

const slack = new Slack(process.env.WEBHOOK, {
  username: process.env.WEBHOOK_USERNAME,
  iconEmoji: process.env.WEBHOOK_ICON_EMOJI,
}, {
  headers: {host: process.env.WEBHOOK_HOST_HEADER}
});

async function processMailContent(content) {
  const message = await template(content);
  return await slack.send(message);
}

async function processEvent(event) {
  return Promise.all(event.Records.map(record => {
    const {content} = JSON.parse(record.Sns.Message);
    return processMailContent(content);
  }));
}

export function handle(event, context, callback) {
  processEvent(event)
    .then(value => callback(null, value))
    .catch(err => callback(err, null));
}
