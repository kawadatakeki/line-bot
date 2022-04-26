const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
require("dotenv").config();

const config = {
  channelAccessToken: process.env.LINE_MESSAGING_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_MESSAGING_CHANNEL_SECRET
};

const client = new line.Client(config);

exports.lineBot = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    const event = request.body.events[0];

    // ↓ 自分が送ったメッセージ
    const text = event.message.text;

    const textMessage = {
      type: "text",
      text: text,
    };
    const result = await client.replyMessage(event.replyToken, textMessage);
    response.json(result);
  });
