# SES to Slack

This is an AWS Lambda function to forward a mail from SES to Slack.


## How it works

Sender -> SMTP -> SES -> SNS -> Lambda -> Slack Incoming Webhook -> Receiver

![diagram](https://lh5.googleusercontent.com/V-8BCBJhk2ZN4iCg77Ohl-JrKIhTl9uMqKbkl91aWo3BoWy4Zu8_fAIiRgvDfiy5Oz-QqKgg8-1NhEYjHdo0=w2456-h1408)

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
    - `WEBHOOK` = URL of Slack Incoming Webhook
1. Open SNS and create a topic.
1. Create a subscription on the topic:
    - Protocol: AWS Lambda.
    - Endpoint: ARN of the Lambda function.
1. Open SES and make sure your domain has been verified.
1. Create a rule set with the following action:
    - SNS topic: ARN of the SNS topic.
    - Encoding: UTF-8


## Contributions

Feel free to open an issue or pull request.
