# SES to Slack

This is an AWS Lambda function to forward mails from SES to Slack, based on the Serverless framework.


## How it works

```
Mail Server
↓ SMTP
AWS SES
↓ Publish
AWS SNS
↓ Subscribe
AWS Lambda
↓ HTTP(S)
Slack Incoming Webhook
```


## Getting Started

Deploy a Lambda function.

```sh
# Setup credentials
npm run serverless -- config credentials -p aws -k IAM_KEY -s IAM_SECRET

# Deploy
npm install
npm run deploy
```

Open the AWS Management Console and do following steps:

1. Open Lambda and Check ARN of the function, like `arn:aws:lambda:ap-northeast-1:***:function:ses-to-slack-dev-handle`.
1. Add an environment variable on the function:
    - `WEBHOOK`: URL of Slack Incoming Webhook (Mandatory)
    - `WEBHOOK_HOST_HEADER`: Host header for Incoming Webhook request (Optional)
1. Open SNS and create a topic.
1. Create a subscription on the topic:
    - Protocol: AWS Lambda.
    - Endpoint: ARN of the Lambda function.
1. Open SES and make sure your domain has been verified.
1. Create a rule set with the following action:
    - SNS topic: ARN of the SNS topic.
    - Encoding: UTF-8


## Sending to Mattermost

Mattermost is a Slack alternative. You can send mails to a Mattermost channel as well.

1. Create an Incoming Webhook on a Mattermost team.
1. Set the `WEBHOOK` environment variable.

If the instance is protected by the security group, you can send mails via VPC.
For example,

- SES (us-west-2)
- SNS (us-west-2)
- Lambda with VPC (ap-northeast-1)
- EC2 (ap-northeast-1)


## Caveat

SNS can receive mails that are 150kB or less. Larger mails will bounce.


## Contributions

Feel free to open an issue or pull request.
