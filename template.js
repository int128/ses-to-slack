import {simpleParser} from 'mailparser';

export default async function template(mailContent) {
  const mail = await simpleParser(mailContent);
  return `
\`From:\` ${mail.from.text}
\`To:\` ${mail.to.text}
\`Date:\` ${mail.date.toLocaleString()}
\`Subject:\` ${mail.subject}

${mail.text}
`;
}
